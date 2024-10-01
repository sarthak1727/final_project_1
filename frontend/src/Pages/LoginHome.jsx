import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../Components/Navbar';
import PropertySearch from '../Components/PropertySearch';
import FeaturedProperties from '../Components/FeaturedProperties';
import AboutSection from '../Components/AboutSection';
import Footer from '../Components/Footer';
import AddProperty from '../Components/AddProperty';
import { getProperties } from '../services/propertyService';

const LoginHome = () => {
  const [username, setUsername] = useState('');
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      setUsername(storedUsername || '');
      fetchProperties();
    }
  }, [navigate]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const result = await getProperties();
      setProperties(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const toggleAddProperty = () => {
    setShowAddProperty(!showAddProperty);
  };

  return (
    <div>
      <NavbarComponent 
        isLoggedIn={true} 
        username={username} 
        onLogout={handleLogout}
        onAddProperty={toggleAddProperty}
      />
      {showAddProperty ? (
        <AddProperty onPropertyAdded={fetchProperties} />
      ) : (
        <>
          <PropertySearch />
          {isLoading ? (
            <div>Loading properties...</div>
          ) : (
            <FeaturedProperties properties={properties} isLoggedIn={true} />
          )}
          <AboutSection />
        </>
      )}
      <Footer />
    </div>
  );
};

export default LoginHome;