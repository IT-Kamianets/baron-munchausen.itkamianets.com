import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const downloads = [
	{
		url: 'https://img.hotels24.ua/photos/partner_hotel/facility/106/10618/1061876/Gostevoy-dom-Baron-Myunhauzen-Kamenec-Podolskiy-zabronirovat-1061876z600.jpg',
		dest: 'src/assets/gallery/real/01-common-area.jpg',
	},
	{
		url: 'https://img.hotels24.ua/photos/partner_hotel/room/116/11635/1163574/Otel-Baron-Myunhauzen-nomer-Mesto-v-obshem-20-mestnom-nomere-Mujskaya-komnata-hostelnogo-tipa-foto-1163574mx.jpg',
		dest: 'src/assets/gallery/real/02-dorm-bunks.jpg',
	},
	{
		url: 'https://img.hotels24.ua/photos/partner_hotel/room/106/10605/1060547/Gostevoy-dom-Baron-Myunhauzen-nomer-Zmishaniy-nomer-zabronirovat-1060547mx.jpg',
		dest: 'src/assets/gallery/real/03-mixed-dorm.jpg',
	},
	{
		url: 'https://img.hotels24.ua/photos/partner_hotel/room/116/11635/1163569/Gostiniy-dvor-Baron-Myunhauzen-nomer-Jenskaya-komnata-hostelnogo-tipa-foto-1163569mx.jpg',
		dest: 'src/assets/gallery/real/04-corridor-art.jpg',
	},
	{
		url: 'https://img.hotels24.ua/photos/partner_hotel/room/139/13990/1399066/Gostinica-Baron-Myunhauzen-nomer-Standart-odnomestniy-1399066mx.jpg',
		dest: 'src/assets/gallery/real/05-private-single.jpg',
	},
	{
		url: 'https://img.hotels24.ua/photos/partner_hotel/room/128/12887/1288721/Gostiniy-dvor-Baron-Myunhauzen-nomer-4h-mistn-foto-1288721mx.jpg',
		dest: 'src/assets/gallery/real/06-private-compact.jpg',
	},
	{
		url: 'https://img.hotels24.ua/photos/partner_hotel/room/116/11635/1163556/Gostiniy-dvor-Baron-Myunhauzen-nomer-Polulyuks-trehmestniy-Art-studiya-snjat-1163556mx.jpg',
		dest: 'src/assets/gallery/real/07-art-studio.jpg',
	},
	{
		url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WLM_-_2020_-_%D0%9A%D0%B0%D0%BC%27%D1%8F%D0%BD%D0%B5%D1%86%D1%8C-%D0%9F%D0%BE%D0%B4%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%B0_%D1%84%D0%BE%D1%80%D1%82%D0%B5%D1%86%D1%8F.jpg',
		dest: 'src/assets/gallery/real/11-fortress-dusk.jpg',
	},
	{
		url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Kamyanets_Podilsky_Old_Town_2011_01.jpg',
		dest: 'src/assets/gallery/real/12-old-town.jpg',
	},
	{
		url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Zamek_w_Kamie%C5%84cu_Podolskim_2019.jpg',
		dest: 'src/assets/gallery/real/13-castle-day.jpg',
	},
	{
		url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WLM_-_2020_-_%D0%9A%D0%B0%D0%BC%27%D1%8F%D0%BD%D0%B5%D1%86%D1%8C-%D0%9F%D0%BE%D0%B4%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%B0_%D1%84%D0%BE%D1%80%D1%82%D0%B5%D1%86%D1%8F.jpg',
		dest: 'src/assets/hero/hero-castle.jpg',
	},
];

const userAgent = 'Mozilla/5.0 (Node.js) fetch-gallery-images';

function getClient(url) {
	return url.startsWith('https:') ? https : http;
}

function ensureDir(filePath) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function downloadFile(url, dest, depth = 0, attempt = 1) {
	return new Promise((resolve) => {
		if (depth > 5) {
			console.error(`Too many redirects for ${url}`);
			return resolve(false);
		}

		const client = getClient(url);
		const request = client.get(
			url,
			{ headers: { 'User-Agent': userAgent } },
			(response) => {
				if (
					response.statusCode &&
					response.statusCode >= 300 &&
					response.statusCode < 400 &&
					response.headers.location
				) {
					const nextUrl = new URL(response.headers.location, url).toString();
					response.resume();
					return resolve(downloadFile(nextUrl, dest, depth + 1));
				}

				if (response.statusCode === 429 || (response.statusCode && response.statusCode >= 500)) {
					if (attempt < 4) {
						const delayMs = 1000 * 2 ** (attempt - 1);
						console.warn(`Retrying ${url} in ${delayMs}ms (status ${response.statusCode})`);
						response.resume();
						setTimeout(
							() => resolve(downloadFile(url, dest, depth, attempt + 1)),
							delayMs
						);
						return;
					}
				}

				if (response.statusCode !== 200) {
					console.error(`Failed ${url} -> ${response.statusCode}`);
					response.resume();
					return resolve(false);
				}

				const fileStream = fs.createWriteStream(dest);
				response.pipe(fileStream);
				fileStream.on('finish', () => fileStream.close(() => resolve(true)));
				fileStream.on('error', (error) => {
					console.error(`Write failed ${dest}: ${error.message}`);
					fileStream.close(() => {
						fs.unlink(dest, () => resolve(false));
					});
				});
			}
		);

		request.on('error', (error) => {
			console.error(`Request failed ${url}: ${error.message}`);
			resolve(false);
		});
	});
}

async function run() {
	let successCount = 0;

	for (const item of downloads) {
		const destination = path.resolve(repoRoot, item.dest);
		ensureDir(destination);

		if (fs.existsSync(destination) && fs.statSync(destination).size > 0) {
			console.log(`Skip (exists): ${item.dest}`);
			successCount += 1;
			continue;
		}

		const ok = await downloadFile(item.url, destination);
		if (ok) {
			console.log(`Downloaded: ${item.dest}`);
			successCount += 1;
		}
	}

	console.log(`Done. ${successCount}/${downloads.length} files ready.`);
}

run().catch((error) => {
	console.error(`Unexpected error: ${error.message}`);
	process.exitCode = 1;
});
