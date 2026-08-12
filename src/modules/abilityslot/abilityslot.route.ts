// import express, {Router } from "express";

import auth,{UserRole} from "../../middleware/auth";
// import { AvailabilityController } from "./abilityslot.controller";


// const router = express.Router();

// router.post("/",auth(),AvailabilityController.createSlot)
// router.get("/",auth(),AvailabilityController.getSlotsByTutor)
// router.put(
//   "/:slotId",
//   auth(),
//   AvailabilityController.updateAvailability
// );


// export const abilitySlot:Router = router;






import express, {Router } from "express";
import { AvailabilityController } from "./abilityslot.controller";


const router = express.Router();

router.post("/",auth(),AvailabilityController.createSlot);



router.get("/my-slots", auth(), AvailabilityController.getMySlots);

router.get("/:id", auth(),AvailabilityController.getSingleSlot);

router.put("/:id",  auth(), AvailabilityController.updateSlot);

router.delete("/:id",auth(),AvailabilityController.deleteSlot);

router.get("/", auth(),AvailabilityController.getAllSlots);



export const abilitySlot:Router = router;