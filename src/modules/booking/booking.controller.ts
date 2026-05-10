import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {

  try {
   // console.log(req.user)
  const result = await BookingService.createBooking(req.body,req.user?.id as string);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
     // data: result,
    });
  } catch (error: any) {
      
    res.status(400).json({
      success: false,
      message: "Booking creation failed",
      error: error.message,
    });
  }
};

 const getUserBookings = async (req:Request, res:Response) => {
    const result = await BookingService.getUserBookings(req.user?.id as string);

    res.json({
      success: true,
      data: result,
    });
  };

  const getBookingById = async (req:Request, res:Response) => {
    const result = await BookingService.getBookingById(req.params.id as string);

    res.json({
      success: true,
      data: result,
    });
  };


export const BookingController = {
  createBooking,getUserBookings,getBookingById
};