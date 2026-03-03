import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	NgZone,
	OnInit,
	OnDestroy,
	ViewChild,
	inject,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../../components/footer/footer.component';
import { CONTENT, GalleryItem, GuestHouseContent, Lang, SectionMeta } from '../../content/guest-house.content';
import { LanguageService } from '../../services/language.service';

@Component({
	selector: 'app-home',
	imports: [CommonModule, FooterComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
	content: GuestHouseContent = CONTENT.ua;
	currentLang: Lang = 'ua';
	navItems: SectionMeta[] = [];
	activeSectionId = 'about';
	isNavOpen = false;
	selectedGalleryItem: GalleryItem | null = null;
	selectedMicroLine = '';
	isPortrait = false;
	selectedAtmosphereLegendLine = this.content.atmosphere.legendLines[0] ?? '';
	mapEmbedUrl!: SafeResourceUrl;
	galleryExpanded = false;
	fullGallery: GalleryItem[] = [];
	featuredGallery: GalleryItem[] = [];
	copySuccess = false;
	private copyTimeoutId?: number;
	activeFaqIndex = -1;
	private langSub?: Subscription;
	roomCategory: 'all' | 'hostel' | 'private' = 'all';

	@ViewChild('header', { static: true }) headerRef!: ElementRef<HTMLElement>;

	private observer?: IntersectionObserver;
	private resizeHandler?: () => void;
	private platformId = inject(PLATFORM_ID);
	private sanitizer = inject(DomSanitizer);
	private zone = inject(NgZone);
	private cdr = inject(ChangeDetectorRef);
	private languageService = inject(LanguageService);

	private get isBrowser(): boolean {
		return isPlatformBrowser(this.platformId);
	}

	ngOnInit(): void {
		this.languageService.initLang();
		this.langSub = this.languageService.currentLang$.subscribe((lang) => {
			this.currentLang = lang;
			this.updateContent(CONTENT[lang]);
		});
	}

	ngAfterViewInit(): void {
		if (!this.isBrowser) {
			return;
		}

		this.selectedAtmosphereLegendLine = this.pickRandomLine(this.content.atmosphere.legendLines);
		this.cdr.markForCheck();

		this.updateHeaderOffset();
		this.initObserver();

		this.resizeHandler = () => {
			this.updateHeaderOffset();
			this.initObserver();
		};

		window.addEventListener('resize', this.resizeHandler);

		const hash = window.location.hash.replace('#', '');
		if (hash) {
			setTimeout(() => this.scrollToSection(hash), 0);
		}
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
		this.langSub?.unsubscribe();

		if (this.resizeHandler && this.isBrowser) {
			window.removeEventListener('resize', this.resizeHandler);
		}

		if (this.copyTimeoutId && this.isBrowser) {
			window.clearTimeout(this.copyTimeoutId);
		}
	}

	@HostListener('document:keydown.escape')
	handleEscape(): void {
		if (this.selectedGalleryItem) {
			this.closeGallery();
		}
	}

	toggleNav(): void {
		this.isNavOpen = !this.isNavOpen;
	}

	onNavClick(sectionId: string, event?: Event): void {
		if (event) {
			event.preventDefault();
		}

		this.scrollToSection(sectionId);
		this.isNavOpen = false;
	}

	scrollToSection(sectionId: string): void {
		if (!this.isBrowser) {
			return;
		}

		const target = document.getElementById(sectionId);
		if (!target) {
			return;
		}

		const headerOffset = this.getHeaderOffset() + 12;
		const elementTop = target.getBoundingClientRect().top + window.scrollY;
		const offsetTop = elementTop - headerOffset;

		window.scrollTo({ top: offsetTop, behavior: 'smooth' });
		this.activeSectionId = sectionId;
	}

	openGallery(item: GalleryItem): void {
		this.selectedGalleryItem = item;
		this.isPortrait = false;
		if (!this.isBrowser) {
			return;
		}
		const img = new Image();
		img.onload = () => {
			this.isPortrait = img.naturalHeight > img.naturalWidth;
			this.cdr.markForCheck();
		};
		img.src = item.src;
	}

	closeGallery(): void {
		this.selectedGalleryItem = null;
		this.isPortrait = false;
	}

	setLang(lang: Lang): void {
		this.languageService.setLang(lang);
	}

	copyMapLink(): void {
		if (!this.isBrowser) {
			return;
		}

		const text = this.content.contacts.mapUrl;
		const complete = (success: boolean) => {
			if (!success) {
				return;
			}
			this.copySuccess = true;
			if (this.copyTimeoutId) {
				window.clearTimeout(this.copyTimeoutId);
			}
			this.copyTimeoutId = window.setTimeout(() => {
				this.copySuccess = false;
				this.cdr.markForCheck();
			}, 2000);
			this.cdr.markForCheck();
		};

		if (navigator.clipboard?.writeText) {
			navigator.clipboard
				.writeText(text)
				.then(() => complete(true))
				.catch(() => complete(false));
			return;
		}

		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.style.position = 'fixed';
		textarea.style.opacity = '0';
		document.body.appendChild(textarea);
		textarea.focus();
		textarea.select();

		try {
			const success = document.execCommand('copy');
			complete(success);
		} catch {
			complete(false);
		} finally {
			document.body.removeChild(textarea);
		}
	}

	toggleGallery(): void {
		this.galleryExpanded = !this.galleryExpanded;
	}

	setRoomCategory(category: 'all' | 'hostel' | 'private'): void {
		this.roomCategory = category;
	}

	toggleFaq(index: number): void {
		this.activeFaqIndex = this.activeFaqIndex === index ? -1 : index;
	}

	get filteredRooms(): typeof this.content.rooms.types {
		if (this.roomCategory === 'all') {
			return this.content.rooms.types;
		}
		return this.content.rooms.types.filter((room) => room.category === this.roomCategory);
	}

	get visibleGallery(): GalleryItem[] {
		return this.galleryExpanded ? this.fullGallery : this.featuredGallery;
	}

	private getFeaturedGallery(): GalleryItem[] {
		const featured = this.fullGallery.filter((item) => item.featured);
		if (featured.length) {
			return featured.slice(0, 3);
		}
		return this.fullGallery.slice(0, 3);
	}

	private getHeaderOffset(): number {
		return this.headerRef?.nativeElement?.offsetHeight ?? 0;
	}

	private updateContent(content: GuestHouseContent): void {
		this.content = content;
		this.navItems = this.content.sections.filter((section) => section.showInNav);
		this.fullGallery = this.content.gallery.items;
		this.featuredGallery = this.getFeaturedGallery();
		this.selectedGalleryItem = null;
		this.selectedMicroLine = this.content.about.microLines[0] ?? '';
		this.selectedAtmosphereLegendLine = this.content.atmosphere.legendLines[0] ?? '';
		this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
			this.content.location.mapEmbedUrl
		);
		this.cdr.markForCheck();
	}

	private pickRandomLine(lines: string[]): string {
		if (!lines.length) {
			return '';
		}
		const index = Math.floor(Math.random() * lines.length);
		return lines[index];
	}

	private updateHeaderOffset(): void {
		const offset = this.getHeaderOffset() + 12;
		document.documentElement.style.setProperty('--header-offset', `${offset}px`);
	}

	private initObserver(): void {
		if (!this.isBrowser) {
			return;
		}

		this.observer?.disconnect();

		const headerOffset = this.getHeaderOffset() + 12;
		this.observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (visible.length) {
					this.zone.run(() => {
						this.activeSectionId = (visible[0].target as HTMLElement).id;
						this.cdr.markForCheck();
					});
				}
			},
			{
				rootMargin: `-${headerOffset}px 0px -60% 0px`,
				threshold: [0.15, 0.35, 0.6],
			}
		);

		document
			.querySelectorAll('section[data-section]')
			.forEach((section) => this.observer?.observe(section));
	}
}
