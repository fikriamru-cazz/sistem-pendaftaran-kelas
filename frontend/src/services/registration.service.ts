import api from './api';
import { Course } from './course.service';

export interface Registration {
    id: string;
    userId: string;
    courseId: string;
    createdAt: string;
    course: Course;
}

export const registerForCourse = (courseId: string) => {
  return api.post(`/registrations/${courseId}/register`);
};

export const getMyRegistrations = async (): Promise<Registration[]> => {
  const response = await api.get('/registrations/my-registrations');
  return response.data;
};
