import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
	inject,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { CONTENT, GuestHouseContent, Lang } from '../../content/guest-house.content';
import { LanguageService } from '../../services/language.service';

@Component({
	selector: 'app-header',
	imports: [CommonModule, RouterLink, RouterLinkActive],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
	content: GuestHouseContent = CONTENT.ua;
	currentLang: Lang = 'ua';
	isNavOpen = false;
	private langSub?: Subscription;
	private resizeHandler?: () => void;
	private platformId = inject(PLATFORM_ID);
	private cdr = inject(ChangeDetectorRef);
	private languageService = inject(LanguageService);

	@ViewChild('headerEl', { static: true }) headerRef!: ElementRef<HTMLElement>;

	private get isBrowser(): boolean {
		return isPlatformBrowser(this.platformId);
	}

	ngOnInit(): void {
		this.langSub = this.languageService.currentLang$.subscribe((lang) => {
			this.currentLang = lang;
			this.content = CONTENT[lang];
			this.cdr.markForCheck();
		});
	}

	ngAfterViewInit(): void {
		if (!this.isBrowser) return;
		this.updateHeaderOffset();
		this.resizeHandler = () => this.updateHeaderOffset();
		window.addEventListener('resize', this.resizeHandler);
	}

	ngOnDestroy(): void {
		this.langSub?.unsubscribe();
		if (this.resizeHandler && this.isBrowser) {
			window.removeEventListener('resize', this.resizeHandler);
		}
	}

	toggleNav(): void {
		this.isNavOpen = !this.isNavOpen;
	}

	closeNav(): void {
		this.isNavOpen = false;
	}

	setLang(lang: Lang): void {
		this.languageService.setLang(lang);
	}

	private updateHeaderOffset(): void {
		const offset = (this.headerRef?.nativeElement?.offsetHeight ?? 80) + 12;
		document.documentElement.style.setProperty('--header-offset', `${offset}px`);
	}
}
