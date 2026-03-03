export type Lang = 'ua' | 'en';

export interface SectionMeta {
	id: string;
	title: string;
	navLabel?: string;
	showInNav?: boolean;
}

export interface ActionLink {
	label: string;
	href: string;
	variant: 'primary' | 'outline';
}

export interface HeroImage {
	src: string;
	alt: string;
	credit?: string;
}

export interface RoomType {
	title: string;
	icon: 'dorm' | 'private' | 'studio';
	category: 'hostel' | 'private';
	capacity: string;
	bathroom: string;
	features: string[];
	goodFor: string;
}

export interface AmenityCategory {
	title: string;
	icon: 'comfort' | 'leisure' | 'seasonal';
	items: string[];
	note?: string;
}

export interface AtmosphereFeature {
	title: string;
	text: string;
	icon: 'group' | 'motion' | 'quiet';
}

export interface DistanceItem {
	label: string;
	distance: string;
}

export interface ExternalLink {
	key: 'booking' | 'hotels24' | 'tripadvisor' | 'skyscanner' | 'maps';
	title: string;
	url: string;
	iconSrc: string;
	subtitle?: string;
}

export interface ContactInfo {
	title: string;
	nameLine: string;
	phones: { label: string; value: string; display: string }[];
	address: string;
	addressAltLabel: string;
	addressAlt: string;
	mapLabel: string;
	mapUrl: string;
	mapEmbedUrl: string;
	mapEmbedTitle: string;
	checkIn: string;
	checkOut: string;
	infoNote: string;
	platformsLabel: string;
	shareLabel: string;
	copySuccess: string;
}

export interface FaqItem {
	question: string;
	answer: string;
}

export interface GalleryItem {
	src: string;
	title: string;
	alt: string;
	kind: GalleryKind;
	featured?: boolean;
	credit?: string;
	sourceUrl?: string;
}

export interface FooterLink {
	label: string;
	href: string;
}

export interface FooterIconLink {
	label: string;
	href: string;
	icon: string;
	external?: boolean;
}

export type GalleryKind = 'property' | 'city';

export interface GuestHouseContent {
	brand: {
		nameEn: string;
		nameUa: string;
		tagline: string;
		infoNote: string;
		cta: {
			label: string;
			url: string;
		};
	};
	sections: SectionMeta[];
	externalLinks: ExternalLink[];
	hero: {
		title: string;
		tagline: string;
		highlights: string[];
		ctas: ActionLink[];
		image: HeroImage;
	};
	about: {
		title: string;
		lead: string;
		paragraphs: string[];
		promise: string;
		infoHint: string;
		chips: { icon: 'traveler' | 'group' | 'quiet'; label: string }[];
		legendTitle: string;
		microLines: string[];
		expectTitle: string;
		expectations: string[];
		highlights: string[];
	};
	rooms: {
		title: string;
		lead: string;
		facts: string[];
		filters: { id: 'all' | 'hostel' | 'private'; label: string }[];
		disclaimer: string;
		noteTitle: string;
		noteItems: string[];
		types: RoomType[];
	};
	amenities: {
		title: string;
		lead: string;
		expectNote: string;
		checklist: string[];
		categories: AmenityCategory[];
	};
	atmosphere: {
		title: string;
		headline: string;
		pillars: AtmosphereFeature[];
		flourish: string;
		legendTitle: string;
		legendLines: string[];
		eventNote: string;
		inspiration: string[];
	};
	gallery: {
		title: string;
		note: string;
		microLine: string;
		moreLabel: string;
		lessLabel: string;
		creditLabel: string;
		kindLabels: Record<GalleryKind, string>;
		items: GalleryItem[];
	};
	location: {
		title: string;
		address: string;
		addressAltLabel: string;
		addressAlt: string;
		storyLine: string;
		routeTitle: string;
		routeHints: string[];
		distances: DistanceItem[];
		mapLabel: string;
		mapUrl: string;
		mapEmbedUrl: string;
		mapEmbedTitle: string;
	};
	online: {
		title: string;
		lead: string;
		tipTitle: string;
		tipText: string;
	};
	contacts: ContactInfo;
	faq: {
		title: string;
		note: string;
		items: FaqItem[];
	};
	footer: {
		aboutTitle: string;
		navTitle: string;
		contactTitle: string;
		monogram: string;
		description: string;
		platformKeys: ExternalLink['key'][];
		navLinks: FooterLink[];
		bottomLeft: string;
		githubLabel: string;
		githubIcon: string;
		githubUrl: string;
		githubExternal: boolean;
	};
}

const UA_CONTENT: GuestHouseContent = {
	brand: {
		nameEn: 'Baron Munchausen Guest House',
		nameUa: 'Гостинний двір «Барон Мюнхаузен»',
		tagline: 'Трохи легенд. Багато гостинності.',
		infoNote: 'Сайт інформаційний — бронювання через партнерські платформи або телефоном.',
		cta: {
			label: 'Booking.com',
			url: 'https://www.booking.com/hotel/ua/hostel-baron-munchgausen.html',
		},
	},
	sections: [
		{ id: 'top', title: 'Головна', showInNav: false },
		{ id: 'about', title: 'Про дім', navLabel: 'Про дім', showInNav: true },
		{ id: 'rooms', title: 'Номери', navLabel: 'Номери', showInNav: true },
		{ id: 'amenities', title: 'Зручності', navLabel: 'Зручності', showInNav: true },
		{ id: 'atmosphere', title: 'Атмосфера', navLabel: 'Атмосфера', showInNav: true },
		{ id: 'gallery', title: 'Галерея', navLabel: 'Галерея', showInNav: true },
		{ id: 'location', title: 'Локація', navLabel: 'Локація', showInNav: true },
		{ id: 'online', title: 'Онлайн', navLabel: 'Онлайн', showInNav: true },
		{ id: 'contacts', title: 'Контакти', navLabel: 'Контакти', showInNav: true },
		{ id: 'faq', title: 'FAQ', showInNav: false },
	],
	externalLinks: [
		{
			key: 'booking',
			title: 'Booking.com',
			url: 'https://www.booking.com/hotel/ua/hostel-baron-munchgausen.html',
			iconSrc: 'assets/platforms/booking.svg',
			subtitle: 'Бронювання та відгуки',
		},
		{
			key: 'hotels24',
			title: 'Hotels24',
			url: 'https://hotels24.ua/uk/Kamianets-Podilskyi/Guest-Court-Baron-Munchausen-7770.html',
			iconSrc: 'assets/platforms/hotels24.svg',
			subtitle: 'Опис і ціни',
		},
		{
			key: 'tripadvisor',
			title: 'TripAdvisor',
			url: 'https://www.tripadvisor.com/Hotel_Review-g659293-d12198045-Reviews-Baron_Munchausen_Guest_House-Kamianets_Podilskyi_Khmelnytskyi_Oblast.html',
			iconSrc: 'assets/platforms/tripadvisor.svg',
			subtitle: 'Відгуки мандрівників',
		},
		{
			key: 'skyscanner',
			title: 'Skyscanner Hotels',
			url: 'https://www.skyscanner.com.ua/hotels/ukraine/kamenets-podolskiy-hotels/baron-munchausen-guest-house/ht-147828898',
			iconSrc: 'assets/platforms/skyscanner.svg',
			subtitle: 'Пошук пропозицій',
		},
		{
			key: 'maps',
			title: 'Google Maps',
			url:
				'https://www.google.com/maps/search/?api=1&query=Marshala+Kharchenka+24%2C+Kamianets-Podilskyi%2C+Ukraine',
			iconSrc: 'assets/platforms/google-maps.svg',
			subtitle: 'Локація та маршрут',
		},
	],
	hero: {
		title: 'Гостинний двір «Барон Мюнхаузен»',
		tagline: 'Трохи легенд. Багато гостинності.',
		highlights: ['Wi‑Fi', 'Кухня', 'Парковка', 'Ігрова зона'],
		ctas: [
			{ label: 'Зателефонувати', href: 'tel:+380675101504', variant: 'primary' },
			{ label: 'Платформи бронювання', href: '#online', variant: 'outline' },
		],
		image: {
			src: 'assets/hero/hero-castle.jpg',
			alt: 'Фортеця Кам’янця-Подільського на заході сонця',
			credit: 'Фото: Wikimedia Commons (CC BY-SA 4.0)',
		},
	},
	about: {
		title: 'Про наш дім',
		lead: 'Теплий простір для мандрівників, пар і компаній, де легко знайти і спілкування, і тишу.',
		paragraphs: [
			'Гостинний двір «Барон Мюнхаузен» — це гостьовий будинок із хостельними кімнатами та приватними номерами. Формат підходить і для соло-мандрівників, і для пар, і для невеликих груп.',
			'У будинку є спільна кухня та лаунж-зони, де зручно поговорити, пограти чи розпланувати маршрут. Якщо хочеться тиші — вона теж тут є.',
			'Практичні речі без сюрпризів: Wi‑Fi, опалення, парковка, резервне живлення. Пральня та праска — за запитом, а з тваринами можна за домовленістю.',
		],
		promise: 'Трохи легенд у деталях — багато гостинності в сервісі.',
		infoHint: 'Сайт інформаційний: бронювання через партнерські платформи або телефоном.',
		chips: [
			{ icon: 'traveler', label: 'Для мандрівників' },
			{ icon: 'group', label: 'Для компаній' },
			{ icon: 'quiet', label: 'Для тихих вечорів' },
		],
		legendTitle: 'Легенда дня',
		microLines: [
			'Барон любив пригоди — ми любимо, коли гостям затишно.',
			'Тут легко і відпочити, і поговорити, і пограти.',
			'Трохи легенд у деталях — багато гостинності в сервісі.',
			'Кам’янець поруч — а тиша вдома.',
		],
		expectTitle: 'Що вас чекає',
		expectations: [
			'Спокійні ночі без метушні',
			'Лаунж для розмов і ігор',
			'До міських локацій — кілька хвилин на таксі',
		],
		highlights: [
			'Спільна кухня для самостійного приготування',
			'Зони для спілкування та відпочинку',
			'Ігрова зона: більярд, настільний футбол, настільні ігри',
			'Парковка для гостей',
			'Wi‑Fi у зонах проживання',
			'З тваринами — за домовленістю',
		],
	},
	rooms: {
		title: 'Номери та формати проживання',
		lead: 'Без зайвого: чисто, затишно і з усім необхідним для відпочинку.',
		facts: ['Хостельні кімнати + приватні номери', 'Wi‑Fi та опалення', 'Кухня та спільні зони'],
		filters: [
			{ id: 'all', label: 'Усі' },
			{ id: 'hostel', label: 'Хостел' },
			{ id: 'private', label: 'Приватні' },
		],
		disclaimer: 'Уточнюйте деталі та наявність на платформах або телефоном.',
		noteTitle: 'Корисно знати',
		noteItems: [
			'Сайт не приймає бронювання — лише інформація.',
			'Наявність та умови — на Booking/Hotels24 або телефоном.',
			'Якщо їдете групою — краще узгодити заздалегідь.',
		],
		types: [
			{
				title: 'Dorm: жіночий 10‑місний',
				icon: 'dorm',
				category: 'hostel',
				capacity: 'Місткість: до 10 гостей',
				bathroom: 'Санвузол: спільний',
				features: ['Wi‑Fi', 'Опалення', 'Місце для речей', 'Світло біля ліжка'],
				goodFor: 'Добре для компанії',
			},
			{
				title: 'Dorm: змішаний 6‑місний',
				icon: 'dorm',
				category: 'hostel',
				capacity: 'Місткість: до 6 гостей',
				bathroom: 'Санвузол: спільний',
				features: ['Wi‑Fi', 'Опалення', 'Місце для речей', 'Світло біля ліжка'],
				goodFor: 'Добре для активних мандрівників',
			},
			{
				title: 'Dorm: чоловічий 4‑місний',
				icon: 'dorm',
				category: 'hostel',
				capacity: 'Місткість: до 4 гостей',
				bathroom: 'Санвузол: спільний',
				features: ['Wi‑Fi', 'Опалення', 'Місце для речей', 'Тиха локація'],
				goodFor: 'Добре для тихої ночі',
			},
			{
				title: 'Private: single',
				icon: 'private',
				category: 'private',
				capacity: 'Місткість: 1 гість',
				bathroom: 'Санвузол: уточнюйте (в окремих номерах — приватний)',
				features: ['Wi‑Fi', 'Опалення', 'Робочий стіл', 'Місце для речей'],
				goodFor: 'Добре для мандрівника',
			},
			{
				title: 'Private: double',
				icon: 'private',
				category: 'private',
				capacity: 'Місткість: 2 гості',
				bathroom: 'Санвузол: уточнюйте (в окремих номерах — приватний)',
				features: ['Wi‑Fi', 'Опалення', 'Затишна зона відпочинку', 'Місце для речей'],
				goodFor: 'Добре для пари',
			},
			{
				title: 'Арт‑студія',
				icon: 'studio',
				category: 'private',
				capacity: 'Місткість: 2–3 гості',
				bathroom: 'Санвузол: приватний',
				features: ['Wi‑Fi', 'Опалення', 'Міні‑кухня', 'Джакузі / гідромасажна ванна'],
				goodFor: 'Добре для особливої події',
			},
		],
	},
	amenities: {
		title: 'Зручності та сервіси',
		lead: 'Комфорт у дрібницях — щоб у пригоді думати лише про враження.',
		expectNote: 'Усе потрібне поруч, без зайвого шуму.',
		checklist: [
			'Wi‑Fi та кухня — щоб не випадати з ритму',
			'Ігри та спільний простір — щоб вечір був живим',
			'Тиша вночі — щоб пригоди були тільки вдень',
		],
		categories: [
			{
				title: 'Комфорт',
				icon: 'comfort',
				items: [
					'Безкоштовний Wi‑Fi',
					'Спільна кухня (самостійне приготування)',
					'Парковка для гостей',
					'Опалення',
					'Резервне живлення (генератор)',
					'Пральня (може бути платно)',
					'Праска та дошка (за запитом)',
				],
				note: 'Деякі послуги — за запитом.',
			},
			{
				title: 'Дозвілля',
				icon: 'leisure',
				items: ['Більярд', 'Настільний футбол', 'Настільні ігри', 'Спільний простір для компаній'],
			},
			{
				title: 'Додатково / сезонно / за запитом',
				icon: 'seasonal',
				items: [
					'Екскурсії (піші/водні) — за запитом',
					'Сауна / риболовля — за домовленістю',
					'Кінні прогулянки або віндсерфінг — за запитом / сезонно',
					'Підкажемо маршрут чи трансферні варіанти — за запитом',
				],
				note: 'Уточнюйте можливості на місці або телефоном.',
			},
		],
	},
	atmosphere: {
		title: 'Атмосфера',
		headline: 'Місце, де люблять історії',
		pillars: [
			{
				title: 'Для компаній',
				text: 'Простір для зустрічей, ігор і спілкування.',
				icon: 'group',
			},
			{
				title: 'Для руху',
				text: 'Активності та настрій мандрівки — коли хочеться драйву.',
				icon: 'motion',
			},
			{
				title: 'Для тиші',
				text: 'Спокійні ночі й відпочинок, коли хочеться паузи.',
				icon: 'quiet',
			},
		],
		flourish: 'Трохи легенд у деталях — багато гостинності в сервісі.',
		legendTitle: 'Легенда вечора',
		legendLines: [
			'Тут добре починати день з планів і закінчувати — розмовами.',
			'Барон любив перебільшувати — ми любимо перевершувати очікування в дрібницях.',
			'Кам’янець поруч, а вдома — тепло й спокій.',
			'Історії — для настрою. Комфорт — для відпочинку.',
		],
		eventNote: 'Події та концерти — за розкладом, якщо плануються. Уточнюйте на місці або телефоном.',
		inspiration: ['Старе місто', 'Фортеця', 'Дністер'],
	},
	gallery: {
		title: 'Галерея',
		note: '',
		microLine: 'Кілька кадрів з нашого дому — решта історій чекає на вас у Кам’янці.',
		moreLabel: 'Більше фото',
		lessLabel: 'Згорнути',
		creditLabel: 'Фото:',
		kindLabels: {
			property: 'Гостьовий дім',
			city: 'Кам’янець-Подільський',
		},
		items: [
			{
				src: 'assets/gallery/real/01-common-area.jpg',
				title: 'Спільна зона та лаунж',
				alt: 'Спільна зона відпочинку з меблями',
				kind: 'property',
				featured: true,
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/facility/106/10618/1061876/Gostevoy-dom-Baron-Myunhauzen-Kamenec-Podolskiy-zabronirovat-1061876z600.jpg',
			},
			{
				src: 'assets/gallery/real/02-dorm-bunks.jpg',
				title: 'Dorm-кімната з двоярусними ліжками',
				alt: 'Dorm-кімната з двоярусними ліжками',
				kind: 'property',
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/116/11635/1163574/Otel-Baron-Myunhauzen-nomer-Mesto-v-obshem-20-mestnom-nomere-Mujskaya-komnata-hostelnogo-tipa-foto-1163574mx.jpg',
			},
			{
				src: 'assets/gallery/real/03-mixed-dorm.jpg',
				title: 'Змішаний dorm з муралом',
				alt: 'Dorm-кімната з муралом на стіні',
				kind: 'property',
				featured: true,
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/106/10605/1060547/Gostevoy-dom-Baron-Myunhauzen-nomer-Zmishaniy-nomer-zabronirovat-1060547mx.jpg',
			},
			{
				src: 'assets/gallery/real/04-corridor-art.jpg',
				title: 'Деталі інтер’єру',
				alt: 'Коридор з атмосферними деталями',
				kind: 'property',
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/116/11635/1163569/Gostiniy-dvor-Baron-Myunhauzen-nomer-Jenskaya-komnata-hostelnogo-tipa-foto-1163569mx.jpg',
			},
			{
				src: 'assets/gallery/real/05-private-single.jpg',
				title: 'Приватний одномісний номер',
				alt: 'Приватний одномісний номер з освітленням',
				kind: 'property',
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/139/13990/1399066/Gostinica-Baron-Myunhauzen-nomer-Standart-odnomestniy-1399066mx.jpg',
			},
			{
				src: 'assets/gallery/real/06-private-compact.jpg',
				title: 'Компактний приватний номер',
				alt: 'Приватний номер з ліжком',
				kind: 'property',
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/128/12887/1288721/Gostiniy-dvor-Baron-Myunhauzen-nomer-4h-mistn-foto-1288721mx.jpg',
			},
			{
				src: 'assets/gallery/real/07-art-studio.jpg',
				title: 'Арт-студія',
				alt: 'Номер арт-студії з ліжком',
				kind: 'property',
				featured: true,
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/116/11635/1163556/Gostiniy-dvor-Baron-Myunhauzen-nomer-Polulyuks-trehmestniy-Art-studiya-snjat-1163556mx.jpg',
			},
			{
				src: 'assets/gallery/real/11-fortress-dusk.jpg',
				title: 'Фортеця на заході сонця',
				alt: 'Фортеця Кам’янця-Подільського на заході сонця',
				kind: 'city',
				credit: 'Wikimedia Commons (CC BY-SA 4.0)',
				sourceUrl:
					'https://upload.wikimedia.org/wikipedia/commons/0/07/WLM_-_2020_-_%D0%9A%D0%B0%D0%BC%27%D1%8F%D0%BD%D0%B5%D1%86%D1%8C-%D0%9F%D0%BE%D0%B4%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%B0_%D1%84%D0%BE%D1%80%D1%82%D0%B5%D1%86%D1%8F.jpg',
			},
			{
				src: 'assets/gallery/real/12-old-town.jpg',
				title: 'Панорама Старого міста',
				alt: 'Панорама Старого міста Кам’янця-Подільського',
				kind: 'city',
				credit: 'Wikimedia Commons (CC BY-SA 4.0)',
				sourceUrl:
					'https://upload.wikimedia.org/wikipedia/commons/a/aa/Kamyanets_Podilsky_Old_Town_2011_01.jpg',
			},
			{
				src: 'assets/gallery/real/13-castle-day.jpg',
				title: 'Фортеця вдень',
				alt: 'Фортеця Кам’янця-Подільського вдень',
				kind: 'city',
				credit: 'Wikimedia Commons (CC BY-SA 4.0)',
				sourceUrl:
					'https://upload.wikimedia.org/wikipedia/commons/1/10/Zamek_w_Kamie%C5%84cu_Podolskim_2019.jpg',
			},
		],
	},
	location: {
		title: 'Локація та як дістатися',
		address: 'м. Кам’янець-Подільський, вул. Маршала Харченка, 24',
		addressAltLabel: 'також:',
		addressAlt: 'вул. Петра Сагайдачного, 24',
		storyLine: 'Кам’янець поруч — а вдома спокійно й тепло.',
		routeTitle: 'Маршрут Барона',
		routeHints: [
			'До Старого міста — приблизно 3.7 км.',
			'До фортеці — приблизно 4.6 км (ідеально для прогулянки).',
		],
		distances: [
			{ label: 'Старе місто', distance: 'прибл. 3.7 км' },
			{ label: 'Залізничний вокзал', distance: 'прибл. 3.2 км' },
			{ label: 'Фортеця', distance: 'прибл. 4.6 км' },
		],
		mapLabel: 'Відкрити в Google Maps',
		mapUrl:
			'https://www.google.com/maps/search/?api=1&query=Marshala+Kharchenka+24%2C+Kamianets-Podilskyi%2C+Ukraine',
		mapEmbedUrl:
			'https://www.google.com/maps?q=Marshala+Kharchenka+24%2C+Kamianets-Podilskyi%2C+Ukraine&output=embed',
		mapEmbedTitle: 'Барон Мюнхаузен — карта проїзду',
	},
	online: {
		title: 'Онлайн',
		lead: 'Для бронювання та відгуків — партнерські платформи. Для швидкого зв’язку — телефон.',
		tipTitle: 'Порада Барона',
		tipText:
			'Найшвидше — зателефонувати. А для планування подорожі — зручно переглянути відгуки на платформах.',
	},
	contacts: {
		title: 'Контакти',
		nameLine: 'Гостинний двір «Барон Мюнхаузен»',
		phones: [
			{
				label: 'Телефон 1',
				value: '+380675101504',
				display: '+38 (067) 510-15-04',
			},
			{
				label: 'Телефон 2',
				value: '+380688632900',
				display: '+38 (068) 863-29-00',
			},
		],
		address: 'м. Кам’янець-Подільський, вул. Маршала Харченка, 24',
		addressAltLabel: 'також:',
		addressAlt: 'вул. Петра Сагайдачного, 24',
		mapLabel: 'Відкрити в Google Maps',
		mapUrl:
			'https://www.google.com/maps/search/?api=1&query=Marshala+Kharchenka+24%2C+Kamianets-Podilskyi%2C+Ukraine',
		mapEmbedUrl:
			'https://www.google.com/maps?q=Marshala+Kharchenka+24%2C+Kamianets-Podilskyi%2C+Ukraine&output=embed',
		mapEmbedTitle: 'Барон Мюнхаузен — карта проїзду',
		checkIn: 'Заїзд: з 14:00 (орієнтовно)',
		checkOut: 'Виїзд: до 12:00 (орієнтовно)',
		infoNote: 'Сайт інформаційний — бронювання через партнерські платформи або телефоном.',
		platformsLabel: 'Перейти до платформ',
		shareLabel: 'Поділитися локацією',
		copySuccess: 'Скопійовано посилання на карту.',
	},
	faq: {
		title: 'Питання та відповіді',
		note: 'Не знайшли відповідь? Напишіть або зателефонуйте — підкажемо.',
		items: [
			{
				question: 'Чи можна забронювати через сайт?',
				answer: 'Ні. Сайт інформаційний. Бронювання — на платформах або телефоном.',
			},
			{
				question: 'Де бронювати?',
				answer: 'Booking.com, Hotels24 або телефоном за вказаними номерами.',
			},
			{
				question: 'Чи є Wi‑Fi?',
				answer: 'Так, безкоштовний Wi‑Fi доступний у зонах проживання.',
			},
			{
				question: 'Чи є паркування?',
				answer: 'Так, для гостей доступна парковка.',
			},
			{
				question: 'Чи можна з тваринами?',
				answer: 'Так, за попередньою домовленістю.',
			},
			{
				question: 'Чи є кухня?',
				answer: 'Так, у нас спільна кухня для самостійного приготування.',
			},
			{
				question: 'Які розваги є на місці?',
				answer: 'Більярд, настільний футбол, настільні ігри та спільні простори.',
			},
			{
				question: 'Чи тихо вночі?',
				answer:
					'Зазвичай так, але рівень тиші залежить від завантаження. Просимо гостей дотримуватись тиші.',
			},
			{
				question: 'Як дістатися?',
				answer: 'Зручно дістатися таксі або громадським транспортом. Дивіться карту в розділі локації.',
			},
			{
				question: 'Для груп?',
				answer: 'Якщо їдете групою — краще узгодити заздалегідь телефоном.',
			},
		],
	},
	footer: {
		aboutTitle: 'ПРО ДІМ',
		navTitle: 'НАВІГАЦІЯ',
		contactTitle: 'КОНТАКТИ',
		monogram: 'BM',
		description: 'Теплий простір для мандрівників, компаній і добрих історій.',
		platformKeys: ['booking', 'hotels24', 'tripadvisor', 'skyscanner', 'maps'],
		navLinks: [
			{ label: 'Про дім', href: '#about' },
			{ label: 'Номери', href: '#rooms' },
			{ label: 'Зручності', href: '#amenities' },
			{ label: 'Атмосфера', href: '#atmosphere' },
			{ label: 'Галерея', href: '#gallery' },
			{ label: 'Локація', href: '#location' },
			{ label: 'Онлайн', href: '#online' },
			{ label: 'Контакти', href: '#contacts' },
			{ label: 'FAQ', href: '#faq' },
		],
		bottomLeft: '© 2026 Гостинний двір «Барон Мюнхаузен». Всі права захищені.',
		githubLabel: 'GitHub',
		githubIcon: 'GH',
		githubUrl: 'https://github.com/IT-Kamianets/baron-munchausen.itkamianets.com',
		githubExternal: true,
	},
};

const EN_CONTENT: GuestHouseContent = {
	brand: {
		nameEn: 'Baron Munchausen Guest House',
		nameUa: 'Baron Munchausen Guest House',
		tagline: 'A little legend. A lot of hospitality.',
		infoNote: 'Information-only website — booking via partner platforms or by phone.',
		cta: {
			label: 'Booking.com',
			url: 'https://www.booking.com/hotel/ua/hostel-baron-munchgausen.html',
		},
	},
	sections: [
		{ id: 'top', title: 'Home', showInNav: false },
		{ id: 'about', title: 'About', navLabel: 'About', showInNav: true },
		{ id: 'rooms', title: 'Rooms', navLabel: 'Rooms', showInNav: true },
		{ id: 'amenities', title: 'Amenities', navLabel: 'Amenities', showInNav: true },
		{ id: 'atmosphere', title: 'Atmosphere', navLabel: 'Atmosphere', showInNav: true },
		{ id: 'gallery', title: 'Gallery', navLabel: 'Gallery', showInNav: true },
		{ id: 'location', title: 'Location', navLabel: 'Location', showInNav: true },
		{ id: 'online', title: 'Online', navLabel: 'Online', showInNav: true },
		{ id: 'contacts', title: 'Contacts', navLabel: 'Contacts', showInNav: true },
		{ id: 'faq', title: 'FAQ', showInNav: false },
	],
	externalLinks: [
		{
			key: 'booking',
			title: 'Booking.com',
			url: 'https://www.booking.com/hotel/ua/hostel-baron-munchgausen.html',
			iconSrc: 'assets/platforms/booking.svg',
			subtitle: 'Booking and reviews',
		},
		{
			key: 'hotels24',
			title: 'Hotels24',
			url: 'https://hotels24.ua/uk/Kamianets-Podilskyi/Guest-Court-Baron-Munchausen-7770.html',
			iconSrc: 'assets/platforms/hotels24.svg',
			subtitle: 'Descriptions and rates',
		},
		{
			key: 'tripadvisor',
			title: 'TripAdvisor',
			url: 'https://www.tripadvisor.com/Hotel_Review-g659293-d12198045-Reviews-Baron_Munchausen_Guest_House-Kamianets_Podilskyi_Khmelnytskyi_Oblast.html',
			iconSrc: 'assets/platforms/tripadvisor.svg',
			subtitle: 'Traveler reviews',
		},
		{
			key: 'skyscanner',
			title: 'Skyscanner Hotels',
			url: 'https://www.skyscanner.com.ua/hotels/ukraine/kamenets-podolskiy-hotels/baron-munchausen-guest-house/ht-147828898',
			iconSrc: 'assets/platforms/skyscanner.svg',
			subtitle: 'Search offers',
		},
		{
			key: 'maps',
			title: 'Google Maps',
			url:
				'https://www.google.com/maps/search/?api=1&query=Marshala+Kharchenka+24%2C+Kamianets-Podilskyi%2C+Ukraine',
			iconSrc: 'assets/platforms/google-maps.svg',
			subtitle: 'Location and route',
		},
	],
	hero: {
		title: 'Baron Munchausen Guest House',
		tagline: 'A little legend. A lot of hospitality.',
		highlights: ['Wi‑Fi', 'Kitchen', 'Parking', 'Game zone'],
		ctas: [
			{ label: 'Call us', href: 'tel:+380675101504', variant: 'primary' },
			{ label: 'Booking platforms', href: '#online', variant: 'outline' },
		],
		image: {
			src: 'assets/hero/hero-castle.jpg',
			alt: 'Kamianets-Podilskyi fortress at sunset',
			credit: 'Photo: Wikimedia Commons (CC BY-SA 4.0)',
		},
	},
	about: {
		title: 'About the house',
		lead:
			'A warm space for travelers, couples, and small groups where it is easy to find both company and quiet.',
		paragraphs: [
			'Baron Munchausen Guest House combines a guest house format with hostel rooms and private rooms. It works well for solo travelers, couples, and small groups.',
			'There is a shared kitchen and lounge areas for talks, games, or planning routes. When you want quiet, it is here too.',
			'Practical details without surprises: Wi‑Fi, heating, parking, backup power. Laundry and iron are on request; pets by arrangement.',
		],
		promise: 'A little legend in the details — a lot of hospitality in the service.',
		infoHint: 'Information-only website: booking via partner platforms or by phone.',
		chips: [
			{ icon: 'traveler', label: 'For travelers' },
			{ icon: 'group', label: 'For groups' },
			{ icon: 'quiet', label: 'For quiet evenings' },
		],
		legendTitle: 'Legend of the day',
		microLines: [
			'The Baron loved adventures — we love when guests feel cozy.',
			'It is easy to rest, talk, and play here.',
			'A little legend in the details — a lot of hospitality in the service.',
			'Kamianets is close — and home is calm.',
		],
		expectTitle: 'What to expect',
		expectations: [
			'Quiet nights without fuss',
			'Lounge for talks and games',
			'City highlights are just a short ride away',
		],
		highlights: [
			'Shared kitchen for self-catering',
			'Spaces for conversation and rest',
			'Game zone: billiards, table football, board games',
			'Guest parking',
			'Wi‑Fi in living areas',
			'Pets by arrangement',
		],
	},
	rooms: {
		title: 'Rooms & stay formats',
		lead: 'Simple and cozy with everything needed for rest.',
		facts: ['Hostel rooms + private rooms', 'Wi‑Fi and heating', 'Kitchen and shared spaces'],
		filters: [
			{ id: 'all', label: 'All' },
			{ id: 'hostel', label: 'Hostel' },
			{ id: 'private', label: 'Private' },
		],
		disclaimer: 'Please check details and availability on platforms or by phone.',
		noteTitle: 'Good to know',
		noteItems: [
			'The website does not accept bookings — information only.',
			'Availability and conditions — on Booking/Hotels24 or by phone.',
			'If you are coming as a group, please agree in advance.',
		],
		types: [
			{
				title: 'Dorm: female 10-bed',
				icon: 'dorm',
				category: 'hostel',
				capacity: 'Capacity: up to 10 guests',
				bathroom: 'Bathroom: shared',
				features: ['Wi‑Fi', 'Heating', 'Space for belongings', 'Reading light'],
				goodFor: 'Good for groups',
			},
			{
				title: 'Dorm: mixed 6-bed',
				icon: 'dorm',
				category: 'hostel',
				capacity: 'Capacity: up to 6 guests',
				bathroom: 'Bathroom: shared',
				features: ['Wi‑Fi', 'Heating', 'Space for belongings', 'Reading light'],
				goodFor: 'Good for active travelers',
			},
			{
				title: 'Dorm: male 4-bed',
				icon: 'dorm',
				category: 'hostel',
				capacity: 'Capacity: up to 4 guests',
				bathroom: 'Bathroom: shared',
				features: ['Wi‑Fi', 'Heating', 'Space for belongings', 'Quiet location'],
				goodFor: 'Good for a quiet night',
			},
			{
				title: 'Private: single',
				icon: 'private',
				category: 'private',
				capacity: 'Capacity: 1 guest',
				bathroom: 'Bathroom: please уточнюйте (some rooms have private bathrooms)',
				features: ['Wi‑Fi', 'Heating', 'Desk', 'Space for belongings'],
				goodFor: 'Good for a solo traveler',
			},
			{
				title: 'Private: double',
				icon: 'private',
				category: 'private',
				capacity: 'Capacity: 2 guests',
				bathroom: 'Bathroom: please уточнюйте (some rooms have private bathrooms)',
				features: ['Wi‑Fi', 'Heating', 'Cozy seating area', 'Space for belongings'],
				goodFor: 'Good for couples',
			},
			{
				title: 'Art studio',
				icon: 'studio',
				category: 'private',
				capacity: 'Capacity: 2–3 guests',
				bathroom: 'Bathroom: private',
				features: ['Wi‑Fi', 'Heating', 'Kitchenette', 'Jacuzzi / hydromassage bath'],
				goodFor: 'Good for a special occasion',
			},
		],
	},
	amenities: {
		title: 'Amenities & services',
		lead: 'Comfort in small things — so your adventure is only about impressions.',
		expectNote: 'Everything you need nearby, without extra noise.',
		checklist: [
			'Wi‑Fi and kitchen — to stay in rhythm',
			'Games and shared space — for a lively evening',
			'Quiet at night — so adventures are only by day',
		],
		categories: [
			{
				title: 'Comfort',
				icon: 'comfort',
				items: [
					'Free Wi‑Fi',
					'Shared kitchen (self-catering)',
					'Guest parking',
					'Heating',
					'Backup power (generator)',
					'Laundry (may be paid)',
					'Iron and board (on request)',
				],
				note: 'Some services are on request.',
			},
			{
				title: 'Leisure',
				icon: 'leisure',
				items: ['Billiards', 'Table football', 'Board games', 'Shared space for groups'],
			},
			{
				title: 'Seasonal / on request',
				icon: 'seasonal',
				items: [
					'Excursions (walking/water) — on request',
					'Sauna / fishing — by arrangement',
					'Horse riding or windsurfing — on request / seasonal',
					'Route tips or transfer options — on request',
				],
				note: 'Please check on site or by phone.',
			},
		],
	},
	atmosphere: {
		title: 'Atmosphere',
		headline: 'A place that loves stories',
		pillars: [
			{
				title: 'For groups',
				text: 'Space for meetings, games, and conversation.',
				icon: 'group',
			},
			{
				title: 'For movement',
				text: 'Activities and a travel mood — when you want energy.',
				icon: 'motion',
			},
			{
				title: 'For quiet',
				text: 'Calm nights and rest when you want a pause.',
				icon: 'quiet',
			},
		],
		flourish: 'A little legend in the details — a lot of hospitality in the service.',
		legendTitle: 'Legend of the evening',
		legendLines: [
			'It is good to start the day with plans and finish it with conversations.',
			'The Baron loved exaggeration — we love exceeding expectations in the small things.',
			'Kamianets is close, and home is warm and calm.',
			'Stories are for mood. Comfort is for rest.',
		],
		eventNote: 'Events and concerts — by schedule if planned. Please уточнюйте by phone.',
		inspiration: ['Old Town', 'Fortress', 'Dnister'],
	},
	gallery: {
		title: 'Gallery',
		note: '',
		microLine: 'A few frames from our home — the rest of the stories await you in Kamianets.',
		moreLabel: 'More photos',
		lessLabel: 'Collapse',
		creditLabel: 'Photo:',
		kindLabels: {
			property: 'Guest house',
			city: 'Kamianets-Podilskyi',
		},
		items: [
			{
				src: 'assets/gallery/real/01-common-area.jpg',
				title: 'Common area & lounge',
				alt: 'Common lounge area with seating',
				kind: 'property',
				featured: true,
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/facility/106/10618/1061876/Gostevoy-dom-Baron-Myunhauzen-Kamenec-Podolskiy-zabronirovat-1061876z600.jpg',
			},
			{
				src: 'assets/gallery/real/02-dorm-bunks.jpg',
				title: 'Dorm room with bunk beds',
				alt: 'Dorm room with bunk beds',
				kind: 'property',
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/116/11635/1163574/Otel-Baron-Myunhauzen-nomer-Mesto-v-obshem-20-mestnom-nomere-Mujskaya-komnata-hostelnogo-tipa-foto-1163574mx.jpg',
			},
			{
				src: 'assets/gallery/real/03-mixed-dorm.jpg',
				title: 'Mixed dorm with mural',
				alt: 'Dorm room with mural on the wall',
				kind: 'property',
				featured: true,
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/106/10605/1060547/Gostevoy-dom-Baron-Myunhauzen-nomer-Zmishaniy-nomer-zabronirovat-1060547mx.jpg',
			},
			{
				src: 'assets/gallery/real/04-corridor-art.jpg',
				title: 'Interior details',
				alt: 'Corridor with atmospheric details',
				kind: 'property',
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/116/11635/1163569/Gostiniy-dvor-Baron-Myunhauzen-nomer-Jenskaya-komnata-hostelnogo-tipa-foto-1163569mx.jpg',
			},
			{
				src: 'assets/gallery/real/05-private-single.jpg',
				title: 'Private single room',
				alt: 'Private single room with lighting',
				kind: 'property',
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/139/13990/1399066/Gostinica-Baron-Myunhauzen-nomer-Standart-odnomestniy-1399066mx.jpg',
			},
			{
				src: 'assets/gallery/real/06-private-compact.jpg',
				title: 'Compact private room',
				alt: 'Private room with a bed',
				kind: 'property',
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/128/12887/1288721/Gostiniy-dvor-Baron-Myunhauzen-nomer-4h-mistn-foto-1288721mx.jpg',
			},
			{
				src: 'assets/gallery/real/07-art-studio.jpg',
				title: 'Art studio',
				alt: 'Art studio room with bed',
				kind: 'property',
				featured: true,
				credit: 'Hotels24',
				sourceUrl:
					'https://img.hotels24.ua/photos/partner_hotel/room/116/11635/1163556/Gostiniy-dvor-Baron-Myunhauzen-nomer-Polulyuks-trehmestniy-Art-studiya-snjat-1163556mx.jpg',
			},
			{
				src: 'assets/gallery/real/11-fortress-dusk.jpg',
				title: 'Fortress at sunset',
				alt: 'Kamianets-Podilskyi fortress at sunset',
				kind: 'city',
				credit: 'Wikimedia Commons (CC BY-SA 4.0)',
				sourceUrl:
					'https://upload.wikimedia.org/wikipedia/commons/0/07/WLM_-_2020_-_%D0%9A%D0%B0%D0%BC%27%D1%8F%D0%BD%D0%B5%D1%86%D1%8C-%D0%9F%D0%BE%D0%B4%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%B0_%D1%84%D0%BE%D1%80%D1%82%D0%B5%D1%86%D1%8F.jpg',
			},
			{
				src: 'assets/gallery/real/12-old-town.jpg',
				title: 'Old Town panorama',
				alt: 'Panorama of Kamianets-Podilskyi Old Town',
				kind: 'city',
				credit: 'Wikimedia Commons (CC BY-SA 4.0)',
				sourceUrl:
					'https://upload.wikimedia.org/wikipedia/commons/a/aa/Kamyanets_Podilsky_Old_Town_2011_01.jpg',
			},
			{
				src: 'assets/gallery/real/13-castle-day.jpg',
				title: 'Fortress by day',
				alt: 'Kamianets-Podilskyi fortress by day',
				kind: 'city',
				credit: 'Wikimedia Commons (CC BY-SA 4.0)',
				sourceUrl:
					'https://upload.wikimedia.org/wikipedia/commons/1/10/Zamek_w_Kamie%C5%84cu_Podolskim_2019.jpg',
			},
		],
	},
	location: {
		title: 'Location & how to get here',
		address: 'Kamianets-Podilskyi, Marshala Kharchenka St, 24',
		addressAltLabel: 'also:',
		addressAlt: 'Petra Sahaidachnoho St, 24',
		storyLine: 'Kamianets is close — and home is calm and warm.',
		routeTitle: 'Baron’s route',
		routeHints: [
			'To the Old Town — about 3.7 km.',
			'To the fortress — about 4.6 km (great for a walk).',
		],
		distances: [
			{ label: 'Old Town', distance: 'approx. 3.7 km' },
			{ label: 'Railway station', distance: 'approx. 3.2 km' },
			{ label: 'Fortress', distance: 'approx. 4.6 km' },
		],
		mapLabel: 'Open in Google Maps',
		mapUrl:
			'https://www.google.com/maps/search/?api=1&query=Marshala+Kharchenka+24%2C+Kamianets-Podilskyi%2C+Ukraine',
		mapEmbedUrl:
			'https://www.google.com/maps?q=Marshala+Kharchenka+24%2C+Kamianets-Podilskyi%2C+Ukraine&output=embed',
		mapEmbedTitle: 'Baron Munchausen — directions map',
	},
	online: {
		title: 'Online',
		lead: 'For booking and reviews — partner platforms. For quick contact — phone.',
		tipTitle: 'Baron’s tip',
		tipText:
			'The fastest way is to call. For planning a trip, it is handy to read reviews on the platforms.',
	},
	contacts: {
		title: 'Contacts',
		nameLine: 'Baron Munchausen Guest House',
		phones: [
			{
				label: 'Phone 1',
				value: '+380675101504',
				display: '+38 (067) 510-15-04',
			},
			{
				label: 'Phone 2',
				value: '+380688632900',
				display: '+38 (068) 863-29-00',
			},
		],
		address: 'Kamianets-Podilskyi, Marshala Kharchenka St, 24',
		addressAltLabel: 'also:',
		addressAlt: 'Petra Sahaidachnoho St, 24',
		mapLabel: 'Open in Google Maps',
		mapUrl:
			'https://www.google.com/maps/search/?api=1&query=Marshala+Kharchenka+24%2C+Kamianets-Podilskyi%2C+Ukraine',
		mapEmbedUrl:
			'https://www.google.com/maps?q=Marshala+Kharchenka+24%2C+Kamianets-Podilskyi%2C+Ukraine&output=embed',
		mapEmbedTitle: 'Baron Munchausen — directions map',
		checkIn: 'Check-in: from 14:00 (approx.)',
		checkOut: 'Check-out: by 12:00 (approx.)',
		infoNote: 'Information-only website — booking via partner platforms or by phone.',
		platformsLabel: 'Go to platforms',
		shareLabel: 'Share location',
		copySuccess: 'Map link copied.',
	},
	faq: {
		title: 'FAQ',
		note: 'Did not find an answer? Message or call — we will help.',
		items: [
			{
				question: 'Can I book through the website?',
				answer: 'No. The site is information-only. Booking is on platforms or by phone.',
			},
			{
				question: 'Where to book?',
				answer: 'Booking.com, Hotels24, or by phone using the numbers above.',
			},
			{
				question: 'Is there Wi‑Fi?',
				answer: 'Yes, free Wi‑Fi is available in living areas.',
			},
			{
				question: 'Is there parking?',
				answer: 'Yes, guest parking is available.',
			},
			{
				question: 'Can I bring pets?',
				answer: 'Yes, by prior arrangement.',
			},
			{
				question: 'Is there a kitchen?',
				answer: 'Yes, we have a shared kitchen for self-catering.',
			},
			{
				question: 'What entertainment is on site?',
				answer: 'Billiards, table football, board games, and shared spaces.',
			},
			{
				question: 'Is it quiet at night?',
				answer:
					'Usually yes, but it depends on occupancy. We ask guests to keep quiet at night.',
			},
			{
				question: 'How to get here?',
				answer: 'Taxi or public transport works well. See the map in the location section.',
			},
			{
				question: 'For groups?',
				answer: 'If you are coming as a group, please agree in advance by phone.',
			},
		],
	},
	footer: {
		aboutTitle: 'ABOUT',
		navTitle: 'NAVIGATION',
		contactTitle: 'CONTACTS',
		monogram: 'BM',
		description: 'A warm space for travelers, groups, and good stories.',
		platformKeys: ['booking', 'hotels24', 'tripadvisor', 'skyscanner', 'maps'],
		navLinks: [
			{ label: 'About', href: '#about' },
			{ label: 'Rooms', href: '#rooms' },
			{ label: 'Amenities', href: '#amenities' },
			{ label: 'Atmosphere', href: '#atmosphere' },
			{ label: 'Gallery', href: '#gallery' },
			{ label: 'Location', href: '#location' },
			{ label: 'Online', href: '#online' },
			{ label: 'Contacts', href: '#contacts' },
			{ label: 'FAQ', href: '#faq' },
		],
		bottomLeft: '© 2026 Baron Munchausen Guest House. All rights reserved.',
		githubLabel: 'GitHub repository',
		githubIcon: 'GH',
		githubUrl: 'https://github.com/IT-Kamianets/baron-munchausen.itkamianets.com',
		githubExternal: true,
	},
};

export const CONTENT: Record<Lang, GuestHouseContent> = {
	ua: UA_CONTENT,
	en: EN_CONTENT,
};
