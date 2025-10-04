import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import registrationRoutes from './routes/registration.routes.js';
const app = express();
app.use(cors());
app.use(express.json());
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/registrations', registrationRoutes);
// Health check route
app.get('/', (req, res) => {
    res.send('API Pendaftaran Kelas sedang berjalan!');
});
export default app;
//# sourceMappingURL=index.js.map