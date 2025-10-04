import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import { getAllCourses, createCourse, updateCourse, deleteCourse, Course, CourseData } from '../services/course.service';
import CourseModal from '../components/CourseModal';
import ParticipantsModal from '../components/ParticipantsModal'; // Import ParticipantsModal

const AdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [courseForParticipantsId, setCourseForParticipantsId] = useState<string | null>(null);
  const [courseForParticipantsName, setCourseForParticipantsName] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const coursesData = await getAllCourses();
      setCourses(coursesData);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setSelectedCourse(null);
    setShowModal(true);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  const handleSave = async (data: CourseData, courseId: string | null) => {
    try {
      if (courseId) {
        await updateCourse(courseId, data);
      } else {
        await createCourse(data);
      }
      handleCloseModal();
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save course');
    }
  };

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setCourseToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (courseToDelete) {
      try {
        await deleteCourse(courseToDelete.id);
        handleCloseDeleteModal();
        fetchData();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete course');
      }
    }
  };

  const handleViewParticipants = (course: Course) => {
    setCourseForParticipantsId(course.id);
    setCourseForParticipantsName(course.name);
    setShowParticipantsModal(true);
  };

  const handleCloseParticipantsModal = () => {
    setCourseForParticipantsId(null);
    setCourseForParticipantsName(null);
    setShowParticipantsModal(false);
  };

  if (loading) {
    return <Container><p>Loading...</p></Container>;
  }

  return (
    <Container>
      <h2 className="my-4">Admin Dashboard - Course Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button className="mb-3" onClick={handleAdd}>Add New Course</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quota</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.quota}</td>
              <td>{course.quota - (course.remainingQuota ?? course.quota)}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(course)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(course)}>Delete</Button>{' '}
                <Button variant="info" size="sm" onClick={() => handleViewParticipants(course)}>View Participants</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CourseModal 
        show={showModal}
        handleClose={handleCloseModal}
        onSave={handleSave}
        course={selectedCourse}
      />

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the course: <strong>{courseToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ParticipantsModal
        show={showParticipantsModal}
        handleClose={handleCloseParticipantsModal}
        courseId={courseForParticipantsId}
        courseName={courseForParticipantsName}
      />
    </Container>
  );
};

export default AdminDashboard;
