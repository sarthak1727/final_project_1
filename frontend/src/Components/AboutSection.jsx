import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../Assets/Css/AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img 
              src="https://s7280.pcdn.co/wp-content/uploads/2020/04/KnowledgeManagementGuidelinesBestPractices.png" 
              alt="About Your Brick" 
              className="about-image img-fluid"
            />
          </Col>
          <Col md={6}>
            <h2 className="section-title about-your-brick-title">About Your Brick</h2>
            <p className="about-text">
              Your Brick is your trusted partner in finding the perfect coworking space in Pune. 
              We offer a wide range of flexible workspaces designed to boost productivity and 
              foster collaboration. Whether you're a freelancer, startup, or established business, 
              we have the ideal space for you.
            </p>
            <ul className="feature-list">
              <li>Prime locations across Pune</li>
              <li>Flexible booking options</li>
              <li>High-speed internet and modern amenities</li>
              <li>Vibrant community of professionals</li>
            </ul>
            <Button variant="outline-primary" className="learn-more-btn">Learn More</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;