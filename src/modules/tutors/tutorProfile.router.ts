import express, {Router } from "express";
import auth,{UserRole} from "../../middleware/auth";
import { TutorController } from "./tutorProfile.controller";
import { AvailabilityController } from "../abilityslot/abilityslot.controller";


const router = express.Router();

router.post("/",auth(UserRole.ADMIN,UserRole.TUTOR),TutorController.createTutorProfile);
// router.post("/ability",AvailabilityController.createSlot);
router.get("/getprofile",TutorController.getprofile)

export const tutorProfile:Router = router;