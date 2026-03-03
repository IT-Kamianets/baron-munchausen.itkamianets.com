import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './services/language.service';

@Component({
	selector: 'app-root',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
	private languageService = inject(LanguageService);

	ngOnInit(): void {
		this.languageService.initLang();
	}
}
