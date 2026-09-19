# Edeva Clinic Portfolio

## Firebase Hosting

Situs ini adalah static site tanpa Firebase SDK. Sebelum deploy, proses build ringan
merender template `<head>` bersama menjadi metadata HTML final untuk setiap halaman.

```bash
node scripts/build-pages.js
```

1. Masuk ke Firebase CLI: `firebase login`
2. Buat atau pilih Firebase project di Firebase Console.
3. Deploy dari folder ini: `firebase deploy --only hosting`

Konfigurasi `firebase.json` menyajikan folder `dist/` yang dibuat oleh perintah di atas.
Project ID lokal tersimpan di `.firebaserc` sebagai `edeva-clinic`.

## Deploy otomatis

Setiap push ke branch `main` akan menjalankan deployment Firebase Hosting. Buat sebuah
Firebase service-account key untuk project `edeva-clinic`, lalu simpan seluruh isi JSON-nya
di GitHub repository secret bernama `FIREBASE_SERVICE_ACCOUNT_EDEVA_CLINIC`.
