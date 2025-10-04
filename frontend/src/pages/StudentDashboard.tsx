import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { getAllCourses, Course } from '../services/course.service';
import { getMyRegistrations, registerForCourse, Registration } from '../services/registration.service';
import CourseCard from '../components/CourseCard';

const StudentDashboard = () => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registeringId, setRegisteringId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const coursesData = await getAllCourses();
      const registrationsData = await getMyRegistrations();
      setAllCourses(coursesData);
      setMyRegistrations(registrationsData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, [fetchData]);

  const registeredCourseIds = useMemo(() => {
    return new Set(myRegistrations.map(reg => reg.courseId));
  }, [myRegistrations]);

  const handleRegister = async (courseId: string) => {
    setRegisteringId(courseId);
    setSuccess('');
    setError('');
    try {
        await registerForCourse(courseId);
        setSuccess('Successfully registered for the course!');
        // Refetch data to update UI
        await fetchData();
    } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to register');
    } finally {
        setRegisteringId(null);
    }
  };

  if (loading) {
    return <Container className="mt-5"><p>Loading dashboard...</p></Container>;
  }

  return (
    <Container>
      <h2 className="my-4">Student Dashboard</h2>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      
      <Row>
        <Col md={8}>
          <h4>Available Courses</h4>
          {allCourses.length > 0 ? allCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course}
              onRegister={handleRegister}
              isRegistered={registeredCourseIds.has(course.id)}
              isRegistering={registeringId === course.id}
            />
          )) : <p>No courses available at the moment.</p>}
        </Col>
        <Col md={4}>
          <h4>My Registrations</h4>
          {myRegistrations.length > 0 ? (
            myRegistrations.map(reg => (
              <div key={reg.id} className="card bg-light mb-2">
                <div className="card-body">
                  <h5 className="card-title">{reg.course.name}</h5>
                  <p className="card-text small">Registered on: {new Date(reg.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p>You have not registered for any courses yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;