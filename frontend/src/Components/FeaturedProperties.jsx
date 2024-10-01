import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getProperties, deleteProperty } from "../services/propertyService";
import UpdatePropertyModal from "./UpdatePropertyModal";
import PropertyCard from "./PropertyCard"; // Import the PropertyCard component
import "../Assets/Css/FeaturedProperties.css";

const FeaturedProperties = ({ isLoggedIn }) => {
	const [properties, setProperties] = useState([]);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [selectedProperty, setSelectedProperty] = useState(null);
	const location = useLocation();

	useEffect(() => {
		fetchProperties();
	}, [location.search]); // Re-fetch when search params change

	const fetchProperties = async () => {
		try {
			const searchParams = new URLSearchParams(location.search);
			const result = await getProperties(searchParams);
			setProperties(result.data);
		} catch (error) {
			console.error("Error fetching properties:", error);
		}
	};

	const handleDelete = async (id) => {
		console.log("delete property", id);
		if (window.confirm("Are you sure you want to delete this property?")) {
			try {
				await deleteProperty(id);
				setProperties(properties.filter((property) => property._id !== id));
			} catch (error) {
				console.error("Error deleting property:", error);
			}
		}
	};

	const handleUpdateClick = (property) => {
		setSelectedProperty(property);
		setShowUpdateModal(true);
	};

	const handleUpdateClose = () => {
		setShowUpdateModal(false);
		setSelectedProperty(null);
	};

	const handleUpdateSuccess = (updatedProperty) => {
		setProperties(
			properties.map((p) =>
				p._id === updatedProperty._id ? updatedProperty : p
			)
		);
		handleUpdateClose();
	};

	return (
		<section className="featured-properties">
			<Container>
				<h2 className="section-title featured-properties-title">
					Featured Properties
				</h2>
				<Row xs={1} sm={2} md={3} className="g-4">
					{properties.map((property) => (
						<Col key={property._id}>
							<PropertyCard
								property={property}
								isLoggedIn={isLoggedIn}
								onEdit={handleUpdateClick}
								onDelete={handleDelete}
							/>
						</Col>
					))}
				</Row>
			</Container>
			{selectedProperty && (
				<UpdatePropertyModal
					show={showUpdateModal}
					onHide={handleUpdateClose}
					property={selectedProperty}
					onUpdateSuccess={handleUpdateSuccess}
				/>
			)}
		</section>
	);
};

export default FeaturedProperties;
