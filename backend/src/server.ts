 import app from './index';

  const PORT = process.env.PORT || 3001;
  // Langsung hardcode ke '0.0.0.0' untuk memastikan berjalan di Render
  const HOST = '0.0.0.0';

  app.listen(Number(PORT), HOST, () => {
    // Pesan log final untuk tes
    console.log(VERSI FINAL: Server berjalan di http://${HOST}:${PORT});
  });