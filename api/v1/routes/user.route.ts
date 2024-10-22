import { Router } from 'express';
import * as controller from "../controller/user.controller";
import * as authMiddleware from "../middlewares/auth.middleware";

const router : Router = Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

// router.post("/password/forgot", controller.forgotPassword);

// router.post("/password/otp", controller.otpPassword);

// router.post("/password/reset", controller.resetPassword);

router.get("/detail", authMiddleware.requireAuth ,controller.detail);

// router.get("/list", authMiddleware.requireAuth ,controller.list);

export const UserRoutes : Router = router;