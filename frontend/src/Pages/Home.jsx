import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../Components/Navbar";
import PropertySearch from "../Components/PropertySearch";
import FeaturedProperties from "../Components/FeaturedProperties";
import AboutSection from "../Components/AboutSection";
import Footer from "../Components/Footer";
import LoginModal from "../Components/LoginModal";
import { getProperties } from "../services/propertyService";

const Home = () => {
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [properties, setProperties] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		if (storedUsername) {
			navigate("/login-home");
		}
		fetchProperties();
	}, []);

	const fetchProperties = async () => {
		setIsLoading(true);
		try {
			const result = await getProperties();
			setProperties(Array.isArray(result) ? result : []);
		} catch (error) {
			console.error("Error fetching properties:", error);
			setProperties([]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLoginClick = () => {
		setShowLoginModal(true);
	};

	const handleLoginSuccess = (username) => {
		localStorage.setItem("username", username);
		navigate("/login-home");
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsLoggedIn(!!token);
	}, []);

	return (
		<div>
			<NavbarComponent isLoggedIn={false} onSignUpClick={handleLoginClick} />
			<PropertySearch />
			{isLoading ? (
				<div>Loading properties...</div>
			) : (
				<FeaturedProperties properties={properties} isLoggedIn={isLoggedIn} />
			)}
			<AboutSection />
			<Footer />
			<LoginModal
				show={showLoginModal}
				onHide={() => setShowLoginModal(false)}
				onLoginSuccess={handleLoginSuccess}
			/>
		</div>
	);
};

export default Home;
