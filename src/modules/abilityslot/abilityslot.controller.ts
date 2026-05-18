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
 try{
   const tutordata = req.body;
  const result = await AvailabilityService.getSlotsByTutor(
    tutordata as string
  );
    res.status(201).json({
    success: true,
    message: "Data Fetched successfully",
    data: result,
  });
 }catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }};

const updateAvailability = async (
  req: Request,
  res: Response
) => {
  try {

    const slotId = req.params.slotId;
    const userId = req.user?.id;

    const result = await AvailabilityService.updateAvailability(
      slotId as string,
      userId as string,
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
      message: error.message || "Failed to update availability",
    });

  }
};

export const AvailabilityController = {
  createSlot,
  getSlotsByTutor,
  updateAvailability

};