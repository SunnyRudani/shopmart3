const express = require("express");
const router = express.Router();
const { ensureAuthorized } = require('../middleware/auth')

const ProductController = require("../Controllers/ProductController");

router.get('/get', (req, res) => ProductController.product.get(req, res))

router.post('/add', (req, res) => ProductController.product.add(req, res))

router.post('/update', (req, res) => ProductController.product.update(req, res))

router.delete('/delete', (req, res) => ProductController.product.delete(req, res))

router.get('/getById', (req, res) => ProductController.product.getById(req, res))


module.exports = router;