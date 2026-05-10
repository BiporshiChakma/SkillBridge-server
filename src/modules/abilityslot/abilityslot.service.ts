import {prisma} from "../../lib/prisma";
import { TutorController } from "../tutors/tutorProfile.controller";

const createSlot = async (userId:string,  payload: any) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: {
      userId:userId,
    },
  });

  if (!profile) {
    throw new Error("Tutor profile not found");
  }
   const existingSlot = await prisma.availabilitySlot.findFirst({
    where: {
      tutorId: profile.userId,
      dayOfWeek: payload.dayOfWeek,
      startTime: payload.startTime,
      endTime: payload.endTime,
    },
  });
   if (existingSlot) {
    throw new Error("This slot already exists");
  }
  const result = await prisma.availabilitySlot.create({
    data: {
      tutorId:  profile.userId,
      dayOfWeek: payload.dayOfWeek,
      startTime: payload.startTime,
      endTime: payload.endTime,
    },
  });

  return result;
};

const getSlotsByTutor = async (tutorId: string) => {
  return prisma.availabilitySlot.findMany({
    where: { tutorId },
    orderBy: { dayOfWeek: "asc" },
  });
};

export const AvailabilityService = {
  createSlot,
  getSlotsByTutor,
};