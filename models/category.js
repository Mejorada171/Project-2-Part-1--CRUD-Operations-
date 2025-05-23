const mongoose = require('mongoose');
module.exports = mongoose.model('Category', new mongoose.Schema({
  title:   { type: String, required: true },
  color:   { type: String, default: '#cccccc' },
  created: { type: Date, default: Date.now }
}));

body('title').notEmpty().withMessage('Title required'),
body('color').isHEXColor().withMessage('Must be hex colour')

if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
