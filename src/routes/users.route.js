import { users } from "../users.js";

import express from 'express';

const router = express.Router();

router.get("/", function (request, response) {
    //request.
    response.json(users)
})

router.get("/:ID", (request, response) => {

    const id = Number(request.params.ID);

    const user = users.find((elementoVisitado) => {
        //return true;
        return elementoVisitado.id === id;
    })

    if (!user) return response.status(404).json({ message: "Usuario no encontrado" })

    response.json(user);
})

router.post("/", (req, res) => {
    const newUser = req.body;

    const newID = users.length + 1;

    users.push({
        ...newUser,
        id: newID,
    });

    res.status(201).json({ inserted: newID })
});

router.put("/:ID", (req, res) => {

    const dataToChange = req.body;
    const idToFind = Number(req.params.ID);

    const foundElement = users.find((elem) => {
        return elem.id === idToFind;
    })

    foundElement.name = dataToChange.name;

    res.status(200).json({ changed: foundElement });
});

router.delete("/:ID", (req, res) => {

    const id = Number(req.params.ID);

    const userIndex = users.findIndex((elementoVisitado) => {
        //return true;
        return elementoVisitado.id === id;
    })

    if (userIndex === -1) {
        return res.status(404).json({ "error": "id not found" })
    }

    const deleted = users.splice(userIndex, 1);

    res.json({ "message": "usuario borrado!!" });
});


export default router;

