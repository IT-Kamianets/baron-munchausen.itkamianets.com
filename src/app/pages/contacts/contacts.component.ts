import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	inject,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CONTENT, GuestHouseContent } from '../../content/guest-house.content';
import { LanguageService } from '../../services/language.service';

@Component({
	selector: 'app-contacts',
	imports: [CommonModule],
	templateUrl: './contacts.component.html',
	styleUrl: './contacts.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit, OnDestroy {
	content: GuestHouseContent = CONTENT.ua;
	mapEmbedUrl!: SafeResourceUrl;
	copySuccess = false;
	activeFaqIndex = -1;
	private copyTimeoutId?: number;
	private langSub?: Subscription;
	private platformId = inject(PLATFORM_ID);
	private sanitizer = inject(DomSanitizer);
	private cdr = inject(ChangeDetectorRef);
	private languageService = inject(LanguageService);

	private get isBrowser(): boolean {
		return isPlatformBrowser(this.platformId);
	}

	ngOnInit(): void {
		this.langSub = this.languageService.currentLang$.subscribe((lang) => {
			this.content = CONTENT[lang];
			this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
				this.content.location.mapEmbedUrl
			);
			this.cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.langSub?.unsubscribe();
		if (this.copyTimeoutId && this.isBrowser) {
			window.clearTimeout(this.copyTimeoutId);
		}
	}

	toggleFaq(index: number): void {
		this.activeFaqIndex = this.activeFaqIndex === index ? -1 : index;
		this.cdr.markForCheck();
	}

	copyMapLink(): void {
		if (!this.isBrowser) return;
		const text = this.content.contacts.mapUrl;
		const complete = (success: boolean) => {
			if (!success) return;
			this.copySuccess = true;
			if (this.copyTimeoutId) window.clearTimeout(this.copyTimeoutId);
			this.copyTimeoutId = window.setTimeout(() => {
				this.copySuccess = false;
				this.cdr.markForCheck();
			}, 2000);
			this.cdr.markForCheck();
		};
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(text).then(() => complete(true)).catch(() => complete(false));
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
			complete(document.execCommand('copy'));
		} catch {
			complete(false);
		} finally {
			document.body.removeChild(textarea);
		}
	}
}
