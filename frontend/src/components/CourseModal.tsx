import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Course, CourseData } from '../services/course.service';

interface CourseModalProps {
  show: boolean;
  handleClose: () => void;
  onSave: (data: CourseData, courseId: string | null) => void;
  course: Course | null; // null for 'Add', course object for 'Edit'
}

const CourseModal = ({ show, handleClose, onSave, course }: CourseModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quota, setQuota] = useState(0);

  useEffect(() => {
    if (course) {
      setName(course.name);
      setDescription(course.description);
      setQuota(course.quota);
    } else {
      // Reset form for 'Add'
      setName('');
      setDescription('');
      setQuota(0);
    }
  }, [course, show]); // Rerun effect if course or show status changes

  const handleSubmit = () => {
    const courseData: CourseData = { name, description, quota: Number(quota) };
    onSave(courseData, course ? course.id : null);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{course ? 'Edit Course' : 'Add New Course'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quota</Form.Label>
            <Form.Control
              type="number"
              value={quota}
              onChange={(e) => setQuota(Number(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseModal;
