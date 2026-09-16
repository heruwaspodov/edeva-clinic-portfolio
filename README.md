# Edeva Clinic Portfolio

## Firebase Hosting

Situs ini adalah static site, jadi tidak memerlukan proses build atau Firebase SDK.

1. Masuk ke Firebase CLI: `firebase login`
2. Buat atau pilih Firebase project di Firebase Console.
3. Deploy dari folder ini: `firebase deploy --only hosting`

Konfigurasi `firebase.json` sudah menunjuk ke root proyek, karena seluruh file HTML,
CSS, JavaScript, font, dan gambar disajikan langsung dari sana. Untuk menyimpan project
ID secara lokal sudah disimpan di `.firebaserc` sebagai `edeva-clinic`.

## Deploy otomatis

Setiap push ke branch `main` akan menjalankan deployment Firebase Hosting. Buat sebuah
Firebase service-account key untuk project `edeva-clinic`, lalu simpan seluruh isi JSON-nya
di GitHub repository secret bernama `FIREBASE_SERVICE_ACCOUNT_EDEVA_CLINIC`.
