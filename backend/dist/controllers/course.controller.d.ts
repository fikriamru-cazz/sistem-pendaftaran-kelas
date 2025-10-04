import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
export declare const getAllCourses: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getCourseById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createCourse: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCourse: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteCourse: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getCourseRegistrations: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=course.controller.d.ts.map