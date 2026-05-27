import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TelegramService {
	private readonly apiUrl = 'https://it.webart.work/api/telegram/contact';
	private readonly slug = 'baron-munchausen';
	private http = inject(HttpClient);

	send(message: string): Observable<boolean> {
		return this.http
			.post(this.apiUrl, { slug: this.slug, message })
			.pipe(
				map(() => true),
				catchError(() => of(false))
			);
	}
}
