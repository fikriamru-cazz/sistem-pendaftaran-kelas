import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Spinner, Alert } from 'react-bootstrap';
import { getCourseParticipants, Participant } from '../services/course.service';

interface ParticipantsModalProps {
  show: boolean;
  handleClose: () => void;
  courseId: string | null;
  courseName: string | null;
}

const ParticipantsModal = ({ show, handleClose, courseId, courseName }: ParticipantsModalProps) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show && courseId) {
      setLoading(true);
      setError('');
      getCourseParticipants(courseId)
        .then((data) => {
          setParticipants(data);
        })
        .catch((err) => {
          setError(err.response?.data?.message || 'Failed to fetch participants');
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!show) {
      // Reset state when modal is closed
      setParticipants([]);
      setError('');
    }
  }, [show, courseId]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Participants for "{courseName}"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <div className="text-center"><Spinner animation="border" /> Loading participants...</div>}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && !error && participants.length === 0 && (
          <Alert variant="info">No participants registered for this course yet.</Alert>
        )}
        {!loading && !error && participants.length > 0 && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, index) => (
                <tr key={p.user.id}>
                  <td>{index + 1}</td>
                  <td>{p.user.name}</td>
                  <td>{p.user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ParticipantsModal;
