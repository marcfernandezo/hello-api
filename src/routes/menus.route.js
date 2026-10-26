import express from "express";

import { menus } from "../menus.js";
import { restaurants } from "../restaurants.js";

const router = express.Router();

const OPTIONAL_TEXT_FIELDS = ["description", "currency", "availability"];
const MUTABLE_FIELDS = ["restaurantId", "name", "price", "dishes", ...OPTIONAL_TEXT_FIELDS];
const REQUIRED_FIELDS = ["restaurantId", "name", "price", "dishes"];

const NOT_FOUND = { message: "Menú no encontrado" };

const isNonEmptyString = (value) => typeof value === "string" && value.trim() !== "";

const isValidDishes = (dishes) =>
    Array.isArray(dishes) &&
    dishes.length > 0 &&
    dishes.every((dish) => dish && isNonEmptyString(dish.name) && isNonEmptyString(dish.category));

const findById = (id) => menus.find((menu) => menu.id === id);

const pickMutableFields = (body) =>
    Object.fromEntries(
        MUTABLE_FIELDS.filter((field) => body[field] !== undefined).map((field) => [field, body[field]])
    );

/**
 * Devuelve un mensaje de error o null si los datos son válidos.
 * requireAll = true (POST) exige todos los campos obligatorios.
 */
function validate(data, { requireAll }) {
    if (requireAll) {
        const missing = REQUIRED_FIELDS.filter((field) => !(field in data));
        if (missing.length > 0) return `Faltan campos obligatorios: ${missing.join(", ")}`;
    }

    if ("restaurantId" in data && !restaurants.some((r) => r.id === data.restaurantId)) {
        return 'El campo "restaurantId" debe ser el id numérico de un restaurante existente';
    }

    if ("name" in data && !isNonEmptyString(data.name)) {
        return 'El campo "name" debe ser un texto no vacío';
    }

    if ("price" in data && !(typeof data.price === "number" && Number.isFinite(data.price) && data.price >= 0)) {
        return 'El campo "price" debe ser un número mayor o igual que 0';
    }

    if ("dishes" in data && !isValidDishes(data.dishes)) {
        return 'El campo "dishes" debe ser una lista no vacía de objetos { category, name }';
    }

    for (const field of OPTIONAL_TEXT_FIELDS) {
        if (field in data && typeof data[field] !== "string") {
            return `El campo "${field}" debe ser un texto`;
        }
    }

    return null;
}

// GET /menus?restaurantId=1
router.get("/", (req, res) => {
    const { restaurantId } = req.query;

    if (restaurantId === undefined) return res.json(menus);

    res.json(menus.filter((menu) => menu.restaurantId === Number(restaurantId)));
});

// GET /menus/:ID
router.get("/:ID", (req, res) => {
    const menu = findById(Number(req.params.ID));

    if (!menu) return res.status(404).json(NOT_FOUND);

    res.json(menu);
});

// POST /menus
router.post("/", (req, res) => {
    const data = pickMutableFields(req.body ?? {});

    const error = validate(data, { requireAll: true });
    if (error) return res.status(400).json({ message: error });

    const newID = Math.max(0, ...menus.map((m) => m.id)) + 1;

    menus.push({ id: newID, currency: "EUR", ...data });

    res.status(201).json({ inserted: newID });
});

// PUT /menus/:ID  (actualiza solo los campos enviados)
router.put("/:ID", (req, res) => {
    const menu = findById(Number(req.params.ID));

    if (!menu) return res.status(404).json(NOT_FOUND);

    const data = pickMutableFields(req.body ?? {});

    if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: "No hay campos válidos que actualizar" });
    }

    const error = validate(data, { requireAll: false });
    if (error) return res.status(400).json({ message: error });

    Object.assign(menu, data);

    res.status(200).json({ changed: menu });
});

// DELETE /menus/:ID
router.delete("/:ID", (req, res) => {
    const index = menus.findIndex((m) => m.id === Number(req.params.ID));

    if (index === -1) return res.status(404).json(NOT_FOUND);

    menus.splice(index, 1);

    res.json({ message: "Menú borrado" });
});

export default router;
