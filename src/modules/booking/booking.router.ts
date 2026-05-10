import express, {Router } from "express";
import { BookingController} from "./booking.controller";
import auth,{UserRole} from "../../middleware/auth";


const router = express.Router();

router.post("/",auth(UserRole.ADMIN,UserRole.STUDENT),BookingController.createBooking);
router.get("/",auth(UserRole.ADMIN,UserRole.STUDENT),BookingController.getUserBookings);
router.get("/:id",auth(UserRole.ADMIN,UserRole.STUDENT),BookingController.getBookingById);



export const bookingRouter:Router = router;