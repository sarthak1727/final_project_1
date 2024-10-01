import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../Assets/Css/Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<Container>
				<Row>
					<Col md={4}>
						<h5>About Us</h5>
						<p>
							Your Brick is a leading property management platform, connecting
							property owners with potential tenants.
						</p>
					</Col>
					<Col md={4}>
						<h5>Quick Links</h5>
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/properties">Properties</a>
							</li>
							<li>
								<a href="/about">About</a>
							</li>
							<li>
								<a href="/contact">Contact</a>
							</li>
						</ul>
					</Col>
					<Col md={4}>
						<h5>Contact Us</h5>
						<p>Email: info@yourbrick.com</p>
						<p>Phone: (123) 456-7890</p>
						<p>Address: 123 Property St, Real Estate City, 12345</p>
					</Col>
				</Row>
				<Row>
					<Col className="text-center mt-3">
						<p>&copy; 2023 Your Brick. All rights reserved.</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
