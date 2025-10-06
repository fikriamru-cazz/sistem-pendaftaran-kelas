import app from './index';

  const PORT = process.env.PORT || 3001;
  const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

  app.listen(Number(PORT), HOST, () => {
    console.log(Server berjalan di http://${HOST}:${PORT});
  });
