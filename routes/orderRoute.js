import { Router } from "express";
const router = Router();


import { isAuthenticated } from "../middleware/auth/isAuthenticare.js";
import { svaeOrderDetails } from "../controllers/OrderController.js";

router.route('/').post(isAuthenticated, svaeOrderDetails);

export default router;