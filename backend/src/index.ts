import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import registrationRoutes from './routes/registration.routes';
import userRoutes from './routes/user.routes';

const app = express();

 app.use(cors({
        origin: "https://akademik-univ-almuttaqiin.vercel.app"
      }));

      app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/users', userRoutes);

// Add testing routes if not in production
if (process.env.NODE_ENV !== 'production') {
    console.log('🛠️  Registering testing routes');
    const testingRoutes = require('./routes/testing.routes');
    app.use('/api/testing', testingRoutes.default);
}


// Health check route
app.get('/', (req: Request, res: Response) => {
  res.send('API Pendaftaran Kelas sedang berjalan!');
});

export default app;
