import express, {Router } from "express";
import auth,{UserRole} from "../../middleware/auth";
import { AdminController } from "./admin.controller";


const router = express.Router();


router.get("/getalluser",auth(),AdminController.getAllUsers);
router.patch("/:id",auth(),AdminController.updateUserStatus);

export const adminRouter:Router = router;