import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  const getStartedLink = () => {
    if (!user) return '/login';
    return user.role === 'ADMIN' ? '/admin' : '/dashboard';
  };

  return (
    <>
      {/* Hero Section */}
      <Container fluid className="bg-light p-5 rounded-lg m-0">
        <Container>
          <h1 className="display-4">Sistem Akademik Mahasiswa</h1>
          <p className="lead">
            Pendidikan adalah Pondasi Kekuatan Bangsa
          </p>
          <hr className="my-4" />
          <p>
            Tentukan arah kuliahmu disini.
          </p>
          <Link to={getStartedLink()} style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg">
              {user ? 'Buka Dashboard' : 'Mulai Sekarang'}
            </Button>
          </Link>
        </Container>
      </Container>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="text-center">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3">PJJ S1 Informatika</Card.Title>
                <Card.Text>
                  Menciptakan arsitek solusi digital masa depan. Membangun kompetensi untuk menciptakan, mengelola, dan mengamankan teknologi yang mendorong inovasi di berbagai industri, dari startup hingga korporasi besar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3">PJJ S1 Akuntansi</Card.Title>
                <Card.Text>
                  Menciptakan profesional keuangan yang berintegritas dan adaptif. Menguasai analisis data, pelaporan keuangan, dan kepatuhan pajak untuk memastikan kesehatan dan pertumbuhan bisnis yang berkelanjutan di era digital.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h3">PJJ S1 Manajemen</Card.Title>
                <Card.Text>
                  Melahirkan pemimpin yang visioner dan manajer yang efektif. Kembangkan kemampuan strategis dalam pemasaran, pengelolaan sumber daya manusia, dan perencanaan bisnis untuk memimpin tim dan mencapai tujuan.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="py-4 text-center">
        <Container>
          <p className="text-muted">© {new Date().getFullYear()} Sistem Pendaftaran Kelas. All Rights Reserved.</p>
        </Container>
      </footer>
    </>
  );
};

export default HomePage;
