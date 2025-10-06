import app from './index';

  const PORT = process.env.PORT || 3001;
  const HOST = '0.0.0.0';

  app.listen(Number(PORT), HOST, () => {
    console.log(Server berjalan di http://${HOST}:${PORT});
  });
