import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
   console.log(req.body)

  try {
    const result = await BookingService.createBooking(req.body);
   
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
       console.log(req.body)
    res.status(400).json({
      success: false,
      message: "Booking creation failed",
      error: error.message,
    });
  }
};

export const BookingController = {
  createBooking,
};