// import { Request, Response } from "express";
// import { BookingService } from "./booking.service";
// import { success } from "better-auth/*";

// const createBooking = async (req: Request, res: Response) => {
//   try {
//     if (!req.user?.id) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const result = await BookingService.createBooking(
//       req.body,
//       req.user?.id as string
//     );

//     res.status(201).json({
//       success: true,
//       message: "Booking created successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: "Booking creation failed",
//       error: error.message,
//     });
//   }
// };
// const getUserBookings = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const result = await BookingService.getAllBookings();

//     res.status(200).json({
//       success: true,
//       message: "Data fetched successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: "Data fetch failed",
//       error: error.message,
//     });
//   }
// };  const getBookingById = async (req:Request, res:Response) => {
//   try{
//       const result = await BookingService.getBookingById(req.params.id as string);

//      res.status(201).json({
//       success: true,
//       message: "Data Fetched successfully",
//      data: result,
//     });
//   }catch (error: any) {  
//     res.status(400).json({
//       success: false,
//       message: "Data Fetched failed",
//       error: error.message,
//     });
//   }
//   };
// const updateBooking = async ( req: Request, res: Response ) => 
//   { try 
//     { 
//       if (!req.user?.id) { 
//         return res.status(401).json
//         ({ 
//           success: false,
//            message: "Unauthorized", 
//           }); } 
//     const bookingId = req.params.id;
//      if ( !bookingId || Array.isArray(bookingId) ) {
//        return res.status(400).json({
//          success: false,
//           message: "Invalid booking ID",
//          }); } 
//     const result = await BookingService.updateBooking( bookingId, req.user.id as string, req.body ); 
//     return res.status(200).json({
//        success: true,
//         message: "Booking updated successfully", 
//         data: result, }); } 
//   catch (error: any) { 
//     console.error( "Update Booking Error:", error );
//      return res.status(400).json({
//        success: false, message: error?.message || "Booking update failed", }); 
//       } };


// export const BookingController = {
//   createBooking,getUserBookings,getBookingById,updateBooking
// };




import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result =
      await BookingService.createBooking(
        req.body,
        req.user.id as string
      );

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(
      "Create Booking Error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error?.message ||
        "Booking creation failed",
    });
  }
};

const getUserBookings = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await BookingService.getAllBookings();

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(
      "Get Bookings Error:",
      error
    );

    return res.status(400).json({
      success: false,
      message: "Data fetch failed",
      error: error.message,
    });
  }
};

const getBookingById = async (
  req: Request,
  res: Response
) => {
  try {
    const bookingId = req.params.id;

    if (
      !bookingId ||
      Array.isArray(bookingId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const result =
      await BookingService.getBookingById(
        bookingId
      );

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(
      "Get Booking By ID Error:",
      error
    );

    return res.status(400).json({
      success: false,
      message: "Data fetch failed",
      error: error.message,
    });
  }
};

const updateBooking = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const bookingId = req.params.id;

    if (
      !bookingId ||
      Array.isArray(bookingId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const result =
      await BookingService.updateBooking(
        bookingId,
        req.user.id as string,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(
      "Update Booking Error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error?.message ||
        "Booking update failed",
    });
  }
};

export const BookingController = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
};
