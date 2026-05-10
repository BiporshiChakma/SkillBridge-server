import express, {Router } from "express";
import auth,{UserRole} from "../../middleware/auth";
import { CategoryController } from "./category.controller";



const router = express.Router();

router.post("/",CategoryController.createCategory)


export const category:Router = router;