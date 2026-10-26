import express from "express";

import { restaurants } from "../restaurants.js";
import { menus } from "../menus.js";

const router = express.Router();

const TEXT_FIELDS = ["name", "cuisine", "address", "city"];
// Campos que el cliente puede enviar (el id nunca se acepta del body).
const MUTABLE_FIELDS = [...TEXT_FIELDS, "phone", "priceRange", "rating", "openingHours"];

const NOT_FOUND = { message: "Restaurante no encontrado" };

const findById = (id) => restaurants.find((restaurant) => restaurant.id === id);

const pickMutableFields = (body) =>
    Object.fromEntries(
        MUTABLE_FIELDS.filter((field) => body[field] !== undefined).map((field) => [field, body[field]])
    );

/**
 * Devuelve un mensaje de error o null si los datos son válidos.
 * requireAll = true (POST) exige los campos de texto obligatorios.
 */
function validate(data, { requireAll }) {
    for (const field of TEXT_FIELDS) {
        if (!(field in data)) {
            if (requireAll) return `El campo "${field}" es obligatorio`;
            continue;
        }
        if (typeof data[field] !== "string" || data[field].trim() === "") {
            return `El campo "${field}" debe ser un texto no vacío`;
        }
    }

    if ("rating" in data && !(typeof data.rating === "number" && data.rating >= 0 && data.rating <= 5)) {
        return 'El campo "rating" debe ser un número entre 0 y 5';
    }

    return null;
}

// GET /restaurants?cuisine=italiana&city=barcelona
router.get("/", (req, res) => {
    const { cuisine, city } = req.query;
    const normalize = (value) => String(value).trim().toLowerCase();

    let result = restaurants;
    if (cuisine) result = result.filter((r) => normalize(r.cuisine) === normalize(cuisine));
    if (city) result = result.filter((r) => normalize(r.city) === normalize(city));

    res.json(result);
});

// GET /restaurants/:ID
router.get("/:ID", (req, res) => {
    const restaurant = findById(Number(req.params.ID));

    if (!restaurant) return res.status(404).json(NOT_FOUND);

    res.json(restaurant);
});

// GET /restaurants/:ID/menus
router.get("/:ID/menus", (req, res) => {
    const id = Number(req.params.ID);

    if (!findById(id)) return res.status(404).json(NOT_FOUND);

    res.json(menus.filter((menu) => menu.restaurantId === id));
});

// POST /restaurants
router.post("/", (req, res) => {
    const data = pickMutableFields(req.body ?? {});

    const error = validate(data, { requireAll: true });
    if (error) return res.status(400).json({ message: error });

    // length + 1 colisionaría tras un DELETE: se usa max(id) + 1.
    const newID = Math.max(0, ...restaurants.map((r) => r.id)) + 1;

    restaurants.push({ id: newID, ...data });

    res.status(201).json({ inserted: newID });
});

// PUT /restaurants/:ID  (actualiza solo los campos enviados)
router.put("/:ID", (req, res) => {
    const restaurant = findById(Number(req.params.ID));

    if (!restaurant) return res.status(404).json(NOT_FOUND);

    const data = pickMutableFields(req.body ?? {});

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: "No hay campos válidos que actualizar" });
    }

    const error = validate(data, { requireAll: false });
    if (error) return res.status(400).json({ message: error });

    Object.assign(restaurant, data);

    res.status(200).json({ changed: restaurant });
});

// DELETE /restaurants/:ID  (borra también sus menús)
router.delete("/:ID", (req, res) => {
    const id = Number(req.params.ID);

    const index = restaurants.findIndex((r) => r.id === id);
    if (index === -1) return res.status(404).json(NOT_FOUND);

    restaurants.splice(index, 1);

    // Recorrido inverso para poder hacer splice sin saltarse elementos.
    for (let i = menus.length - 1; i >= 0; i--) {
        if (menus[i].restaurantId === id) menus.splice(i, 1);
    }

    res.json({ message: "Restaurante borrado" });
});

export default router;
