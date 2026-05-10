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

const getprofile = async(req:Request, res:Response)=>{
const userId = req.user?.id;
try{
  const result = await TutorService.getprofile(userId as string);
    res.status(201).json({
      success: true,
      message: "Data fetched successfully",
      data: result,
    });
}catch(error){
    res.status(400).json({
      success: false,
      message: error
    });
}
}

export const TutorController = {
  createTutorProfile,getprofile
};