import React from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { Course } from '../services/course.service';

interface CourseCardProps {
  course: Course;
  onRegister: (courseId: string) => void;
  isRegistered: boolean;
  isRegistering: boolean;
}

const CourseCard = ({ course, onRegister, isRegistered, isRegistering }: CourseCardProps) => {
  const getButtonContent = () => {
    if (isRegistering) {
      return (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          {' '}
          Registering...
        </>
      );
    }
    if (isRegistered) return 'Registered';
    // Use `?? 0` to handle cases where remainingQuota might be undefined.
    if ((course.remainingQuota ?? 0) <= 0) return 'Full';
    return 'Register';
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{course.name}</Card.Title>
        <Card.Text>{course.description}</Card.Text>
        <Card.Text>
          <strong>Quota: {course.remainingQuota ?? course.quota} / {course.quota}</strong>
        </Card.Text>
        <Button 
          variant={isRegistered ? "success" : "primary"}
          onClick={() => onRegister(course.id)}
          disabled={isRegistered || (course.remainingQuota ?? 0) <= 0 || isRegistering}
        >
          {getButtonContent()}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
