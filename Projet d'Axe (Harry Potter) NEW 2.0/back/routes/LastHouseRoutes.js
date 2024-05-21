import express from "express";

const houseVisited = express.Router();

let lastHouseVisited = "Gryffindor";

houseVisited.get("/", (req, res) => {
    res.json({ message: lastHouseVisited });
});

houseVisited.post("/maisons", (req, res) => {
    console.log(req.body);
    lastHouseVisited = req.body.house;
    res.json({ message: lastHouseVisited });
});

houseVisited.get("/maisons", (req, res) => {
    res.json({ house: lastHouseVisited });
});

export default houseVisited;