import { Request, Response } from "express";
import { TutorService } from "../tutors/tutorProfile.service";

const createTutorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; 
    const result = await TutorService.createTutorProfile(userId as string, req.body);

    res.status(201).json({
      success: true,
      message: "Tutor profile created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create tutor profile",
    });
  }
};

const getMyTutorProfile = async (req: Request, res: Response) => {
  try {
    const result = await TutorService.getMyTutorProfile(
      req.user?.id as string
    );
   
    res.json({
      success: true,
      message: "Tutor profile fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTutorProfile = async (req:Request, res:Response) => {
  try {
    const result = await TutorService.updateTutorProfile(
      req.user?.id as string,
      req.body
    );

    res.json({
      success: true,
      message: "Tutor profile updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const TutorController = {
  createTutorProfile,getMyTutorProfile,updateTutorProfile
};