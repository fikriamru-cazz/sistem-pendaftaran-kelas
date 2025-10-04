import api from './api';

// Define types for the service layer to ensure type safety
interface UserCredentials {
  email: string;
  password: string;
}

interface UserRegistrationData extends UserCredentials {
  name: string;
}

interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'STUDENT' | 'ADMIN';
  };
}

export const register = (data: UserRegistrationData) => {
  return api.post('/auth/register', data);
};

export const login = async (credentials: UserCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};
