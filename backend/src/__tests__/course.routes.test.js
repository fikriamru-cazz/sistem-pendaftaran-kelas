import { vi, describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import { PrismaClient } from '@prisma/client';

// Mock the middleware
vi.mock('../middleware/auth.middleware.js', () => ({
  __esModule: true,
  protect: vi.fn((req, res, next) => {
    req.user = { userId: 'cl-mock-user-id', role: 'STUDENT' }; // Default mock as STUDENT
    next();
  }),
  isAdmin: vi.fn((req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  }),
}));

const prisma = new PrismaClient();

describe('Course Routes', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/courses', () => {
    it('should return 401 Unauthorized if no token is provided', async () => {
      const { protect } = await import('../middleware/auth.middleware.js');
      protect.mockImplementationOnce((req, res, next) => {
        return res.status(401).json({ message: 'Not authorized, no token' });
      });
      const response = await request(app).get('/api/courses');
      expect(response.status).toBe(401);
    });

    it('should return 200 OK for an authenticated user', async () => {
      const { protect } = await import('../middleware/auth.middleware.js');
      protect.mockImplementationOnce((req, res, next) => {
        req.user = { userId: 'cl-mock-user-id', role: 'STUDENT' };
        next();
      });
      const response = await request(app).get('/api/courses');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/courses', () => {
    const testCourse = {
      name: 'Test Course for Jest',
      description: 'A course created during a test run',
      quota: 20,
    };
    let createdCourseId;

    afterEach(async () => {
      // Clean up the created course
      if (createdCourseId) {
        await prisma.course.deleteMany({ where: { id: createdCourseId } });
        createdCourseId = '';
      }
    });

    it('should return 403 Forbidden for a non-admin user', async () => {
      // Default mock is a STUDENT, so this should fail
      const response = await request(app).post('/api/courses').send(testCourse);
      expect(response.status).toBe(403);
    });

    it('should create a new course and return 201 for an admin user', async () => {
      const { protect } = await import('../middleware/auth.middleware.js');
      // Override the mock for this specific test to be an ADMIN
      protect.mockImplementationOnce((req, res, next) => {
        req.user = { userId: 'cl-mock-admin-id', role: 'ADMIN' };
        next();
      });

      const response = await request(app).post('/api/courses').send(testCourse);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(testCourse.name);
      expect(response.body.id).toBeDefined();
      createdCourseId = response.body.id; // Save for cleanup
    });
  });
});
