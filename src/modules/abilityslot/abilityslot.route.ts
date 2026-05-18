import express, {Router } from "express";

import auth,{UserRole} from "../../middleware/auth";
import { AvailabilityController } from "./abilityslot.controller";


const router = express.Router();

router.post("/",auth(),AvailabilityController.createSlot)
router.get("/",auth(),AvailabilityController.getSlotsByTutor)
router.put(
  "/:slotId",
  auth(),
  AvailabilityController.updateAvailability
);


export const abilitySlot:Router = router;