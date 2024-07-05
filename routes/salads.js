
const express = require("express");
const router = express.Router();

const saladController = require("../controllers/saladController");

/**
 * @swagger
 * components:
 *  schemas:
 *    Salad:
 *      type: object
 *      properties:
 *        idProd:
 *          type: string
 *        name:
 *          type: string
 *        currency:
 *          type: string
 *        prices:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              size:
 *                type: string
 *              price:
 *                type: number
 *              description:
 *                type: string
 *        img:
 *          type: array
 *          items:
 *            type: string
 *        description:
 *          type: string
 *        slug:
 *          type: string
 *      example:
 *        name: "Ensalada Cesar"
 *        currency: "USD"
 *        prices: [
 *          {
 *            "size": "Individual",
 *            "price": 150,
 *            "description": "Pollo, lechuga, crotones, anchoas, queso parmesano"
 *          },
 *       
 *        ]
 *        img: [""]
 *        description: "Incluye 1/2 litro de agua fresa"
 *        slug: "cesar"
 */

/**
 * @swagger
 * /api/salads/create:
 *   post:
 *     summary: Crea una nueva ensalada
 *     tags: [Salads]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Salad'
 *     responses:
 *       200:
 *         description: La ensalada se creó con éxito
 *       400:
 *         description: Error al crear la ensalada
 */

router.post("/create", saladController.create);

/**
 * @swagger
 * /api/salads/readall:
 *   get:
 *     summary: Obtiene todas las ensaladas
 *     tags: [Salads]
 *     responses:
 *       200:
 *         description: Lista de todas las ensaladas
 *       400:
 *         description: Error al obtener las ensaladas
 */

router.get("/readall", saladController.readAll);

/**
 * @swagger
 * /api/salads/readone/{slug}:
 *   get:
 *     summary: Obtiene una ensalada por slug
 *     tags: [Salads]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug de la ensalada
 *     responses:
 *       200:
 *         description: Datos de la ensalada
 *       400:
 *         description: Error al obtener la ensalada
 */

router.get("/readone/:slug", saladController.readOne);

module.exports = router;