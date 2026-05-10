import express, {Router } from "express";
import auth,{UserRole} from "../../middleware/auth";
import { ReviewController } from "./review.controller";




const router = express.Router();

router.post("/",auth(),ReviewController.createReview);


export const review:Router = router;