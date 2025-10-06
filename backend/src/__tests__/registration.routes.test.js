import { vi, describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../index.js'; // Assuming your Express app is exported from index.ts
import { PrismaClient } from '@prisma/client';

// Mock the protect middleware
vi.mock('../middleware/auth.middleware.js', () => ({
  __esModule: true,
  protect: vi.fn((req, res, next) => {
    // Default mock user is a STUDENT
    req.user = { userId: 'mock-student-id', role: 'STUDENT' };
    next();
  }),
  isAdmin: vi.fn(), // Not used in these tests, but needs to be mocked
}));

const prisma = new PrismaClient();

describe('Registration Routes', () => {
  let testCourse_available;
  let testCourse_registered_and_full;
  let testCourse_registered_not_full;
  let testStudent;

  beforeAll(async () => {
    // Create a test student
    testStudent = await prisma.user.upsert({
      where: { email: 'student-reg-test@test.com' },
      update: { id: 'mock-student-id' },
      create: {
        id: 'mock-student-id',
        email: 'student-reg-test@test.com',
        name: 'Test Student',
        password: 'password',
        role: 'STUDENT',
      },
    });

    // Create a course with available quota
    testCourse_available = await prisma.course.create({
      data: {
        name: 'Available Course',
        description: 'A test course with space.',
        quota: 2,
      },
    });

    // Create a course that is full because the student is registered
    testCourse_registered_and_full = await prisma.course.create({
      data: {
        name: 'Full Course',
        description: 'A test course with no space.',
        quota: 1,
        registrations: {
          create: {
            userId: testStudent.id,
          },
        },
      },
    });

    // Create a course where the student is registered but there is still space
    testCourse_registered_not_full = await prisma.course.create({
        data: {
          name: 'Not Full, but Registered Course',
          description: 'A test course with space, but user is in.',
          quota: 2,
          registrations: {
            create: {
              userId: testStudent.id,
            },
          },
        },
      });
  });

  afterAll(async () => {
    // Clean up all test data
    const courseIds = [testCourse_available.id, testCourse_registered_and_full.id, testCourse_registered_not_full.id];
    await prisma.registration.deleteMany({ where: { courseId: { in: courseIds } } });
    await prisma.course.deleteMany({ where: { id: { in: courseIds } } });
    await prisma.user.deleteMany({ where: { email: { contains: '@test.com' } } });
    await prisma.$disconnect();
  });

  describe('POST /api/registrations/:courseId/register', () => {
    it('should allow a student to register for an available course', async () => {
      const response = await request(app)
        .post(`/api/registrations/${testCourse_available.id}/register`);
      
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Successfully registered for the course');

      // Verify the registration in the database
      const registration = await prisma.registration.findFirst({
        where: {
          userId: testStudent.id,
          courseId: testCourse_available.id,
        },
      });
      expect(registration).not.toBeNull();
    });

    it('should return 400 Bad Request when trying to register for a full course', async () => {
        // To test the 'Course is full' message, we need another student
        const anotherStudent = await prisma.user.create({
            data: { email: `another-student-${Date.now()}@test.com`, name: 'Another', password: 'pw' }
        });

        const { protect } = await import('../middleware/auth.middleware.js');
        // Mock the request as if it's from the new student
        protect.mockImplementationOnce((req, res, next) => {
            req.user = { userId: anotherStudent.id, role: 'STUDENT' };
            next();
        });

        const response = await request(app)
            .post(`/api/registrations/${testCourse_registered_and_full.id}/register`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Course is full');
    });

    it('should return 400 Bad Request when trying to register for a course again', async () => {
      // Use the course that is not full but the user is already in
      const response = await request(app)
        .post(`/api/registrations/${testCourse_registered_not_full.id}/register`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User already registered for this course');
    });

    it('should return 404 Not Found for a non-existent course ID', async () => {
      const nonExistentCourseId = 'cl-non-existent-id';
      const response = await request(app)
        .post(`/api/registrations/${nonExistentCourseId}/register`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Course not found');
    });
  });
});
