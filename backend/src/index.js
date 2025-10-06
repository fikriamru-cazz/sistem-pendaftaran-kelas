console.log("SERVER RELOAD: Memastikan rute user termuat...");
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import registrationRoutes from './routes/registration.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Middleware dipisah per baris agar rapi
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('API Pendaftaran Kelas sedang berjalan!');
});

export default app;