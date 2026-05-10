import { Request, Response } from "express";
import { AvailabilityService } from "./abilityslot.service";
import { TutorController } from "../tutors/tutorProfile.controller";




const createSlot = async (req: Request, res: Response) => {

try{
const result = await AvailabilityService.createSlot(req.user?.id as string,req.body)
  res.status(201).json({
    success: true,
    message: "Slot created successfully",
    data: result,
  });
}catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }};

const getSlotsByTutor = async (req: Request, res: Response) => {
  const tutordata = req.body;
  const result = await AvailabilityService.getSlotsByTutor(
    tutordata as string
  );

  res.json({
    success: true,
    data: result,
  });
};

export const AvailabilityController = {
  createSlot,

};