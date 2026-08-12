// import { Request, Response } from "express";
// import { AvailabilityService } from "./abilityslot.service";
// import { TutorController } from "../tutors/tutorProfile.controller";


// const createSlot = async (req: Request, res: Response) => {

// try{
// const result = await AvailabilityService.createSlot(req.user?.id as string,req.body)
//   res.status(201).json({
//     success: true,
//     message: "Slot created successfully",
//     data: result,
//   });
// }catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }};

// const getSlotsByTutor = async (req: Request, res: Response) => {
//  try{
//    const tutordata = req.body;
//   const result = await AvailabilityService.getSlotsByTutor(
//     tutordata as string
//   );
//     res.status(201).json({
//     success: true,
//     message: "Data Fetched successfully",
//     data: result,
//   });
//  }catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }};

// const updateAvailability = async (
//   req: Request,
//   res: Response
// ) => {
//   try {

//     const slotId = req.params.slotId;
//     const userId = req.user?.id;

//     const result = await AvailabilityService.updateAvailability(
//       slotId as string,
//       userId as string,
//       req.body
//     );

//     res.status(200).json({
//       success: true,
//       message: "Availability updated successfully",
//       data: result,
//     });

//   } catch (error: any) {

//     res.status(400).json({
//       success: false,
//       message: error.message || "Failed to update availability",
//     });

//   }
// };

// export const AvailabilityController = {
//   createSlot,
//   getSlotsByTutor,
//   updateAvailability

// };


import { Request, Response } from "express";
import { AvailabilityService } from "./abilityslot.service";


const createSlot = async (req: any, res: Response) => {
  try {
    const tutorId = req.user.id;

    const result = await AvailabilityService.createSlot(
      tutorId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Availability slot created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMySlots = async (req: any, res: Response) => {
  try {
    const tutorId = req.user.id;

    // const result = await AvailabilityService.getMySlots(tutorId);
    const result = await AvailabilityService.getMySlots(tutorId);
    res.status(200).json({
      success: true,
      message: "Availability fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// const getSingleSlot = async (req: Request, res: Response) => {
//   try {
//     const result = await AvailabilityService.getSingleSlot(req.params.id as string);

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "Slot not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Availability fetched successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const updateSlot = async (req: Request, res: Response) => {
  try {
    const result = await AvailabilityService.updateSlot(
      req.params.id as string,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// const getAllSlots = async (req: Request, res: Response) => {
//   try {
//     const result = await AvailabilityService.getAllSlots();

//     res.status(200).json({
//       success: true,
//       message: "All availability slots fetched successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


const deleteSlot = async (req: Request, res: Response) => {
  try {
    const result = await AvailabilityService.deleteSlot(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Availability deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllSlots = async (
  req: Request,
  res: Response
) => {
  const result =
    await AvailabilityService.getAllSlots();

  res.status(200).json({
    success: true,
    message: "Slots fetched successfully",
    data: result,
  });
};

const getSingleSlot = async (
  req: Request,
  res: Response
) => {
  const result =
    await AvailabilityService.getSingleSlot(
      req.params.id as string
    );

  res.status(200).json({
    success: true,
    message: "Slot fetched successfully",
    data: result,
  });
};

export const AvailabilityController = {
  createSlot,
  getMySlots,
  getSingleSlot,
  updateSlot,
  deleteSlot,
  getAllSlots
};