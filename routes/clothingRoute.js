import { Router } from "express";

const router = Router();

import { Clothing } from "../controllers/ClothingController.js";

router.route("/").get(Clothing)

export default router;