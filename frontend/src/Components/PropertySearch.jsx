import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "../Assets/Css/PropertySearch.css";

const PropertySearch = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [searchParams, setSearchParams] = useState({
		name: "",
		location: "",
		priceRange: "All",
		propertyType: "All",
	});

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		setSearchParams({
			name: params.get("name") || "",
			location: params.get("location") || "",
			priceRange: params.get("priceRange") || "All",
			propertyType: params.get("propertyType") || "All",
		});
	}, [location.search]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSearchParams((prevParams) => ({
			...prevParams,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const queryParams = new URLSearchParams(searchParams).toString();
		navigate(`/search?${queryParams}`);
	};

	return (
		<section className="property-search">
			<div className="overlay">
				<Container>
					<h2 className="section-title mb-4">Find Your Perfect Space</h2>
					<Form onSubmit={handleSubmit}>
						<Row className="g-3 align-items-center justify-content-center">
							<Col xs={12} sm={6} md={3} lg={2}>
								<Form.Control
									type="text"
									name="name"
									value={searchParams.name}
									onChange={handleChange}
									placeholder="Property Name"
									className="search-input"
								/>
							</Col>
							<Col xs={12} sm={6} md={3} lg={2}>
								<Form.Control
									type="text"
									name="location"
									value={searchParams.location}
									onChange={handleChange}
									placeholder="Location"
									className="search-input"
								/>
							</Col>
							<Col xs={12} sm={6} md={3} lg={2}>
								<Form.Select
									name="priceRange"
									value={searchParams.priceRange}
									onChange={handleChange}
									className="search-input"
								>
									<option value="All">All Prices</option>
									<option value="0-1000">Less than ₹1000</option>
									<option value="1000-2000">₹1000 - ₹2000</option>
									<option value="2000-5000">₹2000 - ₹5000</option>
									<option value="5000+">Greater than ₹5000</option>
								</Form.Select>
							</Col>
							<Col xs={12} sm={6} md={3} lg={2}>
								<Form.Select
									name="propertyType"
									value={searchParams.propertyType}
									onChange={handleChange}
									className="search-input"
								>
									<option value="All">All Types</option>
									<option value="commercial">Commercial</option>
									<option value="residential">Residential</option>
									<option value="coworking">Coworking</option>
								</Form.Select>
							</Col>
							<Col xs={12} sm={6} md={3} lg={2}>
								<Button
									variant="primary"
									type="submit"
									className="search-button w-100"
								>
									Search Spaces
								</Button>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>
		</section>
	);
};

export default PropertySearch;
