const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/itemController');

const router = express.Router();

router.get('/', controller.getItems);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a number'),
  ],
  controller.createItem
);

router.put('/:id', controller.updateItem);
router.delete('/:id', controller.deleteItem);

module.exports = router;
