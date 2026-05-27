import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	HostListener,
	OnDestroy,
	OnInit,
	inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CONTENT, GuestHouseContent } from '../../content/guest-house.content';
import { LanguageService } from '../../services/language.service';
import { TelegramService } from '../../services/telegram.service';

@Component({
	selector: 'app-home',
	imports: [CommonModule, RouterLink, FormsModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
	content: GuestHouseContent = CONTENT.ua;
	selectedMicroLine = '';

	showBookingModal = false;
	bookingName = '';
	bookingPhone = '';
	bookingStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';

	private langSub?: Subscription;
	private cdr = inject(ChangeDetectorRef);
	private languageService = inject(LanguageService);
	private telegram = inject(TelegramService);

	ngOnInit(): void {
		this.langSub = this.languageService.currentLang$.subscribe((lang) => {
			this.content = CONTENT[lang];
			this.selectedMicroLine = this.content.about.microLines[0] ?? '';
			this.cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.langSub?.unsubscribe();
	}

	onCtaClick(href: string, label: string): void {
		if (href.startsWith('http')) {
			this.telegram.send(`Клієнт натиснув «${label}» — ${href}`).subscribe();
		}
	}

	openBookingModal(): void {
		this.bookingName = '';
		this.bookingPhone = '';
		this.bookingStatus = 'idle';
		this.showBookingModal = true;
		this.cdr.markForCheck();
	}

	closeBookingModal(): void {
		this.showBookingModal = false;
		this.cdr.markForCheck();
	}

	submitBooking(): void {
		if (!this.bookingName.trim() || !this.bookingPhone.trim()) return;
		this.bookingStatus = 'sending';
		this.cdr.markForCheck();

		const message = this.content.bookingModal.telegramMessage(
			this.bookingName.trim(),
			this.bookingPhone.trim()
		);

		this.telegram.send(message).subscribe((ok) => {
			this.bookingStatus = ok ? 'success' : 'error';
			this.cdr.markForCheck();
			if (ok) {
				setTimeout(() => this.closeBookingModal(), 2500);
			}
		});
	}

	@HostListener('document:keydown.escape')
	onEscape(): void {
		if (this.showBookingModal) this.closeBookingModal();
	}
}
