import app from './index.js';

  const PORT = process.env.PORT || 3001;
  // Hardcode HOST untuk Render
  const HOST = '0.0.0.0';

  app.listen(Number(PORT), HOST, () => {
    // Log startup yang sederhana dan bersih
    console.log(`Server is running on port ${PORT}`);
  });