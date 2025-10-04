import api from './api';

// Define the Course type as expected from the backend
export interface Course {
  id: string;
  name: string;
  description: string;
  quota: number;
  remainingQuota?: number; // This is calculated on GET, not on CUD operations
  _count?: { registrations: number };
  createdAt: string;
  updatedAt: string;
}

// Type for CUD operations
export interface CourseData {
    name: string;
    description: string;
    quota: number;
}

// Type for a participant in a course
export interface Participant {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const getAllCourses = async (): Promise<Course[]> => {
  const response = await api.get('/courses');
  return response.data;
};

export const createCourse = async (data: CourseData): Promise<Course> => {
    const response = await api.post('/courses', data);
    return response.data;
}

export const updateCourse = async (id: string, data: Partial<CourseData>): Promise<Course> => {
    const response = await api.put(`/courses/${id}`, data);
    return response.data;
}

export const deleteCourse = async (id: string): Promise<void> => {
    await api.delete(`/courses/${id}`);
}

export const getCourseParticipants = async (courseId: string): Promise<Participant[]> => {
  const response = await api.get(`/courses/${courseId}/registrations`);
  return response.data;
};
