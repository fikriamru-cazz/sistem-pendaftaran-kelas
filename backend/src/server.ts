import app from './index';

      const PORT = process.env.PORT || 3001;
      const HOST = '0.0.0.0'; // Pastikan baris ini masih seperti ini

      app.listen(Number(PORT), HOST, () => {
        // Tambahkan tulisan "VERSI BARU" di sini
        console.log(VERSI BARU: Server berjalan di http://${HOST}:${PORT});
      });