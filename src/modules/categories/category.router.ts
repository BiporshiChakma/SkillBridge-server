import express, {Router } from "express";
import auth,{UserRole} from "../../middleware/auth";
import { CategoryController } from "./category.controller";



const router = express.Router();

router.post("/",auth(),CategoryController.createCategory)
router.get("/",CategoryController.getAllCategories)


export const category:Router = router;