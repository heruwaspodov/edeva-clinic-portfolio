# Klinik Pratama Edeva

Website resmi Klinik Pratama Edeva, klinik kecantikan dan perawatan kulit di
Tasikmalaya.

Live site: <https://edeva-clinic.web.app>

## Fitur

- Halaman layanan, portofolio, appointment, dan kontak.
- Header, footer, preloader, dan metadata SEO yang reusable.
- Clean URL tanpa ekstensi `.html` saat diakses melalui Firebase Hosting.
- Metadata Open Graph, canonical URL, dan schema `MedicalClinic`.
- Tautan Instagram, TikTok, Shopee, dan Google Maps Klinik Edeva.

## Struktur proyek

```text
components/          Shared head, header, footer, and preloader
assets/              Stylesheets, scripts, images, icons, and vendor files
scripts/build-pages.js  Static page builder and SEO metadata renderer
*.html               Source pages
dist/                Generated deployment output
```

## Menjalankan secara lokal

Build halaman ke folder `dist/`:

```bash
node scripts/build-pages.js
```

Untuk preview dengan Vite:

```bash
pnpm dlx vite
```

## Deploy manual

1. Login ke Firebase CLI: `firebase login`
2. Build halaman: `node scripts/build-pages.js`
3. Deploy Hosting: `firebase deploy --only hosting`

Konfigurasi `firebase.json` menggunakan `dist/` sebagai folder publik. Project ID
Firebase tersimpan di `.firebaserc` sebagai `edeva-clinic`.

## Deploy otomatis

Setiap push ke branch `main` menjalankan workflow GitHub Actions untuk membangun dan
mendeploy Firebase Hosting. Workflow membutuhkan repository secret
`FIREBASE_SERVICE_ACCOUNT_EDEVA_CLINIC` yang berisi service-account JSON untuk project
`edeva-clinic`.

## Kontak dan kanal resmi

- Instagram: <https://www.instagram.com/klinik.edeva/?hl=en>
- TikTok: <https://www.tiktok.com/@klinik.edeva>
- Shopee: <https://shopee.co.id/unskinullinataskin>
- Google Maps: <https://maps.app.goo.gl/kpRPzHzyXc6zh7nU9>
