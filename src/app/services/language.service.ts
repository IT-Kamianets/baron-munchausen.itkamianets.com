import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lang } from '../content/guest-house.content';

@Injectable({ providedIn: 'root' })
export class LanguageService {
	private readonly storageKey = 'bm_lang';
	private readonly platformId = inject(PLATFORM_ID);
	private readonly subject = new BehaviorSubject<Lang>('ua');
	private initialized = false;

	get currentLang$() {
		return this.subject.asObservable();
	}

	get currentLang(): Lang {
		return this.subject.value;
	}

	initLang(): void {
		if (this.initialized) {
			return;
		}
		this.initialized = true;
		if (!isPlatformBrowser(this.platformId)) {
			return;
		}
		const stored = window.localStorage.getItem(this.storageKey);
		if (stored === 'ua' || stored === 'en') {
			this.subject.next(stored);
		}
	}

	setLang(lang: Lang): void {
		if (lang === this.subject.value) {
			return;
		}
		this.subject.next(lang);
		if (isPlatformBrowser(this.platformId)) {
			window.localStorage.setItem(this.storageKey, lang);
		}
	}
}
