import express from "express";
import { signUp, logIn, index, show } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/users", index);
router.get("/users/:id", show);

export default router;
