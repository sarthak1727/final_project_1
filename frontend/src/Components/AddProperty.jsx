import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";
import "../Assets/Css/AddProperty.css"; // We'll create this CSS file for custom styles
import { addProperty } from "../services/propertyService";

const AddProperty = ({ onPropertyAdded }) => {
	const [property, setProperty] = useState({
		name: "",
		location: "",
		price: "",
		description: "",
		image: "",
		type: "", // Add this new field
	});
	const [message, setMessage] = useState(null);

	const handleChange = (e) => {
		setProperty({ ...property, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("userId");
			const response = await addProperty({ ...property, userId }, token);
			setMessage({ type: "success", text: "Property added successfully!" });
			setProperty({
				name: "",
				location: "",
				price: "",
				description: "",
				image: "",
				type: "", // Reset the new field
			});
			if (onPropertyAdded) onPropertyAdded();
		} catch (error) {
			setMessage({
				type: "danger",
				text: error.message || "Error adding property. Please try again.",
			});
		}
	};

	return (
		<Container className="add-property-container">
			<Card className="add-property-card">
				<Card.Header as="h2" className="text-center">
					Add New Property
				</Card.Header>
				<Card.Body>
					{message && <Alert variant={message.type}>{message.text}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Property Name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={property.name}
								onChange={handleChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Location</Form.Label>
							<Form.Control
								type="text"
								name="location"
								value={property.location}
								onChange={handleChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								name="price"
								value={property.price}
								onChange={handleChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								name="description"
								value={property.description}
								onChange={handleChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Image URL</Form.Label>
							<Form.Control
								type="text"
								name="image"
								value={property.image}
								onChange={handleChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Property Type</Form.Label>
							<Form.Select
								name="type"
								value={property.type}
								onChange={handleChange}
								required
							>
								<option value="">Select a property type</option>
								<option value="commercial">Commercial</option>
								<option value="residential">Residential</option>
								<option value="coworking">Coworking</option>
							</Form.Select>
						</Form.Group>
						<div className="d-grid gap-2">
							<Button variant="primary" type="submit" size="lg">
								Add Property
							</Button>
							<Button variant="secondary" size="lg" onClick={onPropertyAdded}>
								Cancel
							</Button>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default AddProperty;
