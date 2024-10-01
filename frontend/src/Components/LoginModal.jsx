import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { loginUser, signupUser } from '../services/authService';

const LoginModal = ({ show, onHide, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await signupUser(username, email, password);
      }
      const response = await loginUser(email, password);
      onLoginSuccess(response.username);
      onHide();
    } catch (err) {
      setError(isSignup ? 'Error during signup' : 'Invalid email or password');
    }
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setError('');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isSignup ? 'Sign Up' : 'Login'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {isSignup && (
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          {isSignup && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          )}
          <Button variant="primary" type="submit" className="w-100">
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <Button variant="link" onClick={toggleSignup}>
            {isSignup ? 'Already have an account? Login' : 'New user? Sign up'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;