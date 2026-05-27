import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CONTENT, GuestHouseContent } from '../../content/guest-house.content';
import { LanguageService } from '../../services/language.service';

@Component({
	selector: 'app-rooms',
	imports: [CommonModule],
	templateUrl: './rooms.component.html',
	styleUrl: './rooms.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent implements OnInit, OnDestroy {
	content: GuestHouseContent = CONTENT.ua;
	roomCategory: 'all' | 'hostel' | 'private' = 'all';
	private langSub?: Subscription;
	private cdr = inject(ChangeDetectorRef);
	private languageService = inject(LanguageService);

	ngOnInit(): void {
		this.langSub = this.languageService.currentLang$.subscribe((lang) => {
			this.content = CONTENT[lang];
			this.cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.langSub?.unsubscribe();
	}

	setRoomCategory(category: 'all' | 'hostel' | 'private'): void {
		this.roomCategory = category;
		this.cdr.markForCheck();
	}

	get filteredRooms(): typeof this.content.rooms.types {
		if (this.roomCategory === 'all') return this.content.rooms.types;
		return this.content.rooms.types.filter((room) => room.category === this.roomCategory);
	}
}
