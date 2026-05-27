import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	HostListener,
	OnDestroy,
	OnInit,
	inject,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONTENT, GalleryItem, GuestHouseContent } from '../../content/guest-house.content';
import { LanguageService } from '../../services/language.service';

@Component({
	selector: 'app-atmosphere',
	imports: [CommonModule],
	templateUrl: './atmosphere.component.html',
	styleUrl: './atmosphere.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtmosphereComponent implements OnInit, OnDestroy {
	content: GuestHouseContent = CONTENT.ua;
	selectedGalleryItem: GalleryItem | null = null;
	selectedAtmosphereLegendLine = '';
	isPortrait = false;
	galleryExpanded = false;
	fullGallery: GalleryItem[] = [];
	featuredGallery: GalleryItem[] = [];
	private langSub?: Subscription;
	private platformId = inject(PLATFORM_ID);
	private cdr = inject(ChangeDetectorRef);
	private languageService = inject(LanguageService);

	private get isBrowser(): boolean {
		return isPlatformBrowser(this.platformId);
	}

	ngOnInit(): void {
		this.langSub = this.languageService.currentLang$.subscribe((lang) => {
			this.content = CONTENT[lang];
			this.fullGallery = this.content.gallery.items;
			this.featuredGallery = this.getFeaturedGallery();
			this.selectedAtmosphereLegendLine = this.pickRandomLine(this.content.atmosphere.legendLines);
			this.selectedGalleryItem = null;
			this.cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.langSub?.unsubscribe();
	}

	@HostListener('document:keydown.escape')
	handleEscape(): void {
		if (this.selectedGalleryItem) this.closeGallery();
	}

	openGallery(item: GalleryItem): void {
		this.selectedGalleryItem = item;
		this.isPortrait = false;
		if (!this.isBrowser) return;
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

	toggleGallery(): void {
		this.galleryExpanded = !this.galleryExpanded;
		this.cdr.markForCheck();
	}

	get visibleGallery(): GalleryItem[] {
		return this.galleryExpanded ? this.fullGallery : this.featuredGallery;
	}

	private getFeaturedGallery(): GalleryItem[] {
		const featured = this.fullGallery.filter((item) => item.featured);
		return featured.length ? featured.slice(0, 3) : this.fullGallery.slice(0, 3);
	}

	private pickRandomLine(lines: string[]): string {
		if (!lines.length) return '';
		return lines[Math.floor(Math.random() * lines.length)];
	}
}
