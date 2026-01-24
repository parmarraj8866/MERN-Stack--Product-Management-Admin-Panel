const { store, index, updateSubCategory, trashSubCategory, singleSbCategory } = require('../Controller/subcategory.controller')

const router = require('express').Router()

/**
 * @swagger
 * /api/subcategory:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subcat_name
 *               - cat_id
 *             properties:
 *               subcat_name:
 *                 type: string
 *               cat_id:
 *                 type: string
 *               subcat_description:
 *                 type: string
 *     responses:
 *       201:
 *         description: SubCategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *   get:
 *     summary: Get all subcategories
 *     tags: [SubCategory]
 *     responses:
 *       200:
 *         description: List of all subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 */
router
    .route('/')
    .post(store)
    .get(index)

/**
 * @swagger
 * /api/subcategory/{id}:
 *   get:
 *     summary: Get a single subcategory
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: SubCategory found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: SubCategory not found
 *   put:
 *     summary: Update a subcategory
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subcat_name:
 *                 type: string
 *               cat_id:
 *                 type: string
 *               subcat_description:
 *                 type: string
 *     responses:
 *       200:
 *         description: SubCategory updated successfully
 *   delete:
 *     summary: Delete a subcategory
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: SubCategory deleted successfully
 */
router.put("/:id", updateSubCategory)
router.delete("/:id", trashSubCategory)
router.get("/:id", singleSbCategory)

module.exports = router