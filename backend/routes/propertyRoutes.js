const express = require('express');
const router = express.Router();
const { getProperties, addProperty, updateProperty, deleteProperty, searchProperties } = require('../controllers/propertyController');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

router.get('/', getProperties);
router.post('/', addProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);
router.get('/search', searchProperties);

// Delete a property
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if the user is the owner of the property
    // You might want to add a userId field to your Property model for this
    // if (property.userId.toString() !== req.user.id) {
    //   return res.status(401).json({ message: 'User not authorized' });
    // }

    await property.remove();

    res.json({ message: 'Property removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;