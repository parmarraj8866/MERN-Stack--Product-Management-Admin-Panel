const { store, index, productUpdate, productTrash, productSingle } = require('../Controller/product.controller')
const upload = require("../middleware/upload")

const router = require('express').Router()

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - p_name
 *               - p_price
 *               - cat_id
 *               - subcat_id
 *             properties:
 *               p_name:
 *                 type: string
 *               p_price:
 *                 type: number
 *               p_description:
 *                 type: string
 *               cat_id:
 *                 type: string
 *               subcat_id:
 *                 type: string
 *               p_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router
    .route('/')
    .post(upload.single('p_image'), store)
    .get(index)

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a single product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               p_name:
 *                 type: string
 *               p_price:
 *                 type: number
 *               p_description:
 *                 type: string
 *               cat_id:
 *                 type: string
 *               subcat_id:
 *                 type: string
 *               p_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.put("/:id", upload.single('p_image'), productUpdate)
router.delete("/:id", productTrash)
router.get("/:id", productSingle)

module.exports = router