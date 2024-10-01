import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import "../Assets/Css/PropertyCard.css";

const PropertyCard = ({ property, isLoggedIn, onEdit, onDelete }) => {
	return (
		<Card className="property-card h-100">
			<div className="card-img-wrapper">
				<Card.Img variant="top" src={property.image} className="card-img" />
			</div>
			<Card.Body className="d-flex flex-column">
				<Card.Title>{property.name}</Card.Title>
				<Card.Text>
					Location: {property.location}
					<br />
					Price: ${property.price}
					<br />
					Type: <Badge bg="info" className="mt-2">{property.type}</Badge>
				</Card.Text>
				{isLoggedIn && (
					<div className="mt-auto">
						<Button
							variant="primary"
							className="me-2"
							onClick={() => onEdit(property)}
						>
							Edit
						</Button>
						<Button variant="danger" onClick={() => onDelete(property._id)}>
							Delete
						</Button>
					</div>
				)}
			</Card.Body>
		</Card>
	);
};

export default PropertyCard;
