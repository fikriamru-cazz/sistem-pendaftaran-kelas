import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
export declare const registerForCourse: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMyRegistrations: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=registration.controller.d.ts.map