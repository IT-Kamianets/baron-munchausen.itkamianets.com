import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONTENT, GuestHouseContent, Lang } from '../../content/guest-house.content';
import { LanguageService } from '../../services/language.service';

@Component({
	selector: 'app-footer',
	imports: [CommonModule],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, OnDestroy {
	content: GuestHouseContent = CONTENT.ua;
	footerLinks = this.getFooterLinks(this.content);
	private langSub?: Subscription;
	private cdr = inject(ChangeDetectorRef);
	private languageService = inject(LanguageService);

	ngOnInit(): void {
		this.languageService.initLang();
		this.langSub = this.languageService.currentLang$.subscribe((lang: Lang) => {
			this.updateContent(CONTENT[lang]);
		});
	}

	ngOnDestroy(): void {
		this.langSub?.unsubscribe();
	}

	private updateContent(content: GuestHouseContent): void {
		this.content = content;
		this.footerLinks = this.getFooterLinks(content);
		this.cdr.markForCheck();
	}

	private getFooterLinks(content: GuestHouseContent) {
		return content.footer.platformKeys
			.map((key) => content.externalLinks.find((link) => link.key === key))
			.filter((link): link is typeof content.externalLinks[number] => Boolean(link));
	}
}
