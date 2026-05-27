import { Routes } from '@angular/router';
import { AtmosphereComponent } from './pages/atmosphere/atmosphere.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomsComponent } from './pages/rooms/rooms.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'rooms', component: RoomsComponent },
	{ path: 'atmosphere', component: AtmosphereComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: '**', redirectTo: '' },
];
