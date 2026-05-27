import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
	{ path: '', renderMode: RenderMode.Prerender },
	{ path: 'rooms', renderMode: RenderMode.Prerender },
	{ path: 'atmosphere', renderMode: RenderMode.Prerender },
	{ path: 'contacts', renderMode: RenderMode.Prerender },
	{ path: '**', renderMode: RenderMode.Server },
];
