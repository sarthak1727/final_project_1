import React, { useState } from "react";
import {
	Navbar,
	Nav,
	Container,
	Button,
	Form,
	FormControl,
	Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Assets/Css/Navbar.css";
import logo from "../Assets/Images/logo.png"; // Ensure this path is correct

const NavbarComponent = ({
	isLoggedIn,
	username,
	onLogout,
	onSignUpClick,
	onAddProperty,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
		}
	};

	return (
		<Navbar bg="light" expand="lg" className="custom-navbar">
			<Container fluid>
				<Navbar.Brand as={Link} to="/" className="me-2">
					<Image
						src={logo}
						alt="Your Brick Logo"
						height="30"
						className="d-inline-block align-top"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Form className="d-flex flex-grow-1 mx-3" onSubmit={handleSearch}>
						<FormControl
							type="search"
							placeholder="Search properties by name or location"
							className="me-2 flex-grow-1"
							aria-label="Search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Button variant="outline-success" type="submit">
							Search
						</Button>
					</Form>
					<Nav className="ms-auto">
						{isLoggedIn ? (
							<>
								<Nav.Link as={Button} onClick={onAddProperty}>
									Add Property
								</Nav.Link>
								<Nav.Link>Welcome, {username}</Nav.Link>
								<Nav.Link as={Button} onClick={onLogout}>
									Logout
								</Nav.Link>
							</>
						) : (
							<Nav.Link
								as={Button}
								onClick={onSignUpClick}
								className="ms-2"
								style={{ backgroundColor: "#E69500", color: "white" }}
							>
								Sign Up / Login
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
