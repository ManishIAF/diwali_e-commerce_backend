import { Router } from "express";
const router = Router();


import { isAuthenticated } from "../middleware/auth/isAuthenticare.js";
import { svaeOrderDetails } from "../controllers/OrderController.js";

router.route('/saveorder').post(isAuthenticated, svaeOrderDetails);
router.route('/make-payment').post(isAuthenticated, svaeOrderDetails);

export default router;