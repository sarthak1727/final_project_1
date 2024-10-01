import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { updateProperty } from "../services/propertyService";

const UpdatePropertyModal = ({ show, onHide, property, onUpdateSuccess }) => {
	const [updatedProperty, setUpdatedProperty] = useState(property);
	const [error, setError] = useState("");

	useEffect(() => {
		setUpdatedProperty(property);
	}, [property]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedProperty((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const result = await updateProperty(property._id, updatedProperty);
			onUpdateSuccess(result.data);
		} catch (error) {
			setError("Error updating property. Please try again.");
		}
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Update Property</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Property Name</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={updatedProperty.name}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Location</Form.Label>
						<Form.Control
							type="text"
							name="location"
							value={updatedProperty.location}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Price</Form.Label>
						<Form.Control
							type="number"
							name="price"
							value={updatedProperty.price}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							name="description"
							value={updatedProperty.description}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Image URL</Form.Label>
						<Form.Control
							type="text"
							name="image"
							value={updatedProperty.image}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Property Type</Form.Label>
						<Form.Select
							name="type"
							value={updatedProperty.type}
							onChange={handleChange}
							required
						>
							<option value="">Select a property type</option>
							<option value="commercial">Commercial</option>
							<option value="residential">Residential</option>
							<option value="coworking">Coworking</option>
						</Form.Select>
					</Form.Group>
					<Button variant="primary" type="submit">
						Update Property
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default UpdatePropertyModal;
