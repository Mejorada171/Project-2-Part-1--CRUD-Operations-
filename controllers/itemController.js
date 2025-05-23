const Item = require('../models/itemModel');
const { validationResult } = require('express-validator');

// GET all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST create item
exports.createItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT update item
exports.updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE item
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
