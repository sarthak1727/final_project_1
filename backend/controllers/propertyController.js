const Property = require('../models/Property');

exports.addProperty = async (req, res) => {
  try {
    const { name, location, price, description, image, type, userId } = req.body;
    const newProperty = new Property({
      name,
      location,
      price,
      description,
      image,
      type,
      userId
    });
    await newProperty.save();
    res.status(201).json({ success: true, data: newProperty });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 }).select('name location price image type');
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProperty) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.status(200).json({ success: true, data: updatedProperty });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.searchProperties = async (req, res) => {
  try {
    const { name, location, priceRange, propertyType } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (priceRange && priceRange !== 'All') {
      let [min, max] = priceRange.split('-').map(Number);
      if (priceRange === '5000+') {
        query.price = { $gte: 5000 };
      } else {
        query.price = { $gte: min, $lt: max };
      }
    }

    if (propertyType && propertyType !== 'All') {
      query.type = propertyType;
    }

    const properties = await Property.find(query).select('name location price image type');
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};