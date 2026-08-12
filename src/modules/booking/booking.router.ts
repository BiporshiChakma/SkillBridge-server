import express, {Router } from "express";
import { BookingController} from "./booking.controller";
import auth,{UserRole} from "../../middleware/auth";


const router = express.Router();

router.post("/",auth(),BookingController.createBooking);
router.get("/",auth(),BookingController.getUserBookings);
router.get("/:id",auth(),BookingController.getBookingById);
router.put( "/:id", auth(UserRole.ADMIN,UserRole.TUTOR), BookingController.updateBooking );

export const bookingRouter:Router = router;