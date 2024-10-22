import { Router } from "express";

import userController from "../controllers/user.controller";

const router = Router();

// {host}/api/v1/get-user
router.get("/get-user", userController.getUser);

export default router;
