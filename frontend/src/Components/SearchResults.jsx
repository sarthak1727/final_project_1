import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import NavbarComponent from "./Navbar";
import Footer from "./Footer";
import PropertyCard from "./PropertyCard";
import UpdatePropertyModal from "./UpdatePropertyModal";
import LoginSignupModal from "./LoginModal";
import AddProperty from "./AddProperty";
import PropertySearch from "./PropertySearch";
import "../Assets/Css/SearchResults.css";

const SearchResults = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const location = useLocation();

	// State for editing property
	const [showEditModal, setShowEditModal] = useState(false);
	const [editingProperty, setEditingProperty] = useState(null);

	// State for login/signup modal
	const [showLoginModal, setShowLoginModal] = useState(false);

	// State for showing AddProperty component
	const [showAddProperty, setShowAddProperty] = useState(false);

	useEffect(() => {
		checkLoginStatus();
		fetchSearchResults();
	}, [location.search]);

	const checkLoginStatus = () => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
			setUsername(localStorage.getItem("username") || "User");
		} else {
			setIsLoggedIn(false);
			setUsername("");
		}
	};

	const fetchSearchResults = async () => {
		setLoading(true);
		setError(null);
		const searchParams = new URLSearchParams(location.search);

		try {
			const response = await axios.get(`/api/properties/search`, {
				params: searchParams,
			});
			console.log("Search API response:", response.data);
			if (response.data && Array.isArray(response.data.data)) {
				setProperties(response.data.data);
			} else {
				setError("Received invalid data format from server");
				setProperties([]);
			}
		} catch (error) {
			console.error("Error fetching search results:", error);
			setError("Failed to fetch search results");
			setProperties([]);
		}
		setLoading(false);
	};

	const handleEdit = (property) => {
		setEditingProperty(property);
		setShowEditModal(true);
	};

	const handleCloseEditModal = () => {
		setShowEditModal(false);
		setEditingProperty(null);
	};

	const handleUpdateProperty = async (updatedProperty) => {
		try {
			await axios.put(
				`/api/properties/${updatedProperty._id}`,
				updatedProperty
			);
			fetchSearchResults();
			handleCloseEditModal();
		} catch (error) {
			console.error("Error updating property:", error);
			alert("Failed to update property. Please try again.");
		}
	};

	const handleDelete = async (property) => {
		if (window.confirm(`Are you sure you want to delete ${property.name}?`)) {
			try {
				await axios.delete(`/api/properties/${property._id}`);
				fetchSearchResults();
			} catch (error) {
				console.error("Error deleting property:", error);
				alert("Failed to delete property. Please try again.");
			}
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		setIsLoggedIn(false);
		setUsername("");
	};

	const handleSignUpClick = () => {
		setShowLoginModal(true);
	};

	const handleAddProperty = () => {
		if (isLoggedIn) {
			setShowAddProperty(true);
		} else {
			setShowLoginModal(true);
		}
	};

	const handleLoginSuccess = (user) => {
		setIsLoggedIn(true);
		setUsername(user.username);
		localStorage.setItem("username", user.username);
		setShowLoginModal(false);
	};

	return (
		<div className="page-container">
			<NavbarComponent
				isLoggedIn={isLoggedIn}
				username={username}
				onLogout={handleLogout}
				onSignUpClick={handleSignUpClick}
				onAddProperty={handleAddProperty}
			/>
			{showAddProperty ? (
				<AddProperty
					onPropertyAdded={() => {
						fetchSearchResults();
						setShowAddProperty(false);
					}}
				/>
			) : (
				<>
					<PropertySearch />
					<div className="content-wrap">
						<Container className="search-results">
							<h2>Search Results</h2>
							{loading && <p>Loading...</p>}
							{error && <p>Error: {error}</p>}
							{!loading && !error && properties.length === 0 && (
								<p>No properties found.</p>
							)}
							{!loading && !error && properties.length > 0 && (
								<Row className="property-card-row">
									{properties.map((property) => (
										<Col
											key={property._id}
											xs={12}
											sm={6}
											md={4}
											lg={3}
											className="mb-4"
										>
											<PropertyCard
												property={property}
												onEdit={handleEdit}
												onDelete={handleDelete}
												isLoggedIn={isLoggedIn}
											/>
										</Col>
									))}
								</Row>
							)}
						</Container>
					</div>
				</>
			)}
			<Footer />

			{/* Update Property Modal */}
			{editingProperty && (
				<UpdatePropertyModal
					show={showEditModal}
					onHide={handleCloseEditModal}
					property={editingProperty}
					onUpdateSuccess={handleUpdateProperty}
				/>
			)}

			{/* Login/Signup Modal */}
			<LoginSignupModal
				show={showLoginModal}
				onHide={() => setShowLoginModal(false)}
				onLoginSuccess={handleLoginSuccess}
			/>
		</div>
	);
};

export default SearchResults;