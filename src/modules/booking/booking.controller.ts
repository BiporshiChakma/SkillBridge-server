import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import { success } from "better-auth/*";

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
    try{
      const result = await BookingService.getUserBookings(req.user?.id as string);
    res.status(201).json({
      success: true,
      message: "Data Fetched successfully",
     // data: result,
    });
    }catch (error: any) {  
    res.status(400).json({
      success: false,
      message: "Data Fetched failed",
      error: error.message,
    });
  }
  };

  const getBookingById = async (req:Request, res:Response) => {
  try{
      const result = await BookingService.getBookingById(req.params.id as string);

     res.status(201).json({
      success: true,
      message: "Data Fetched successfully",
     // data: result,
    });
  }catch (error: any) {  
    res.status(400).json({
      success: false,
      message: "Data Fetched failed",
      error: error.message,
    });
  }
  };


export const BookingController = {
  createBooking,getUserBookings,getBookingById
};