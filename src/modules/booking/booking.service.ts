import { lstat } from "node:fs";
import { Booking } from "../../../generated/prisma/client";
import {prisma} from "../../lib/prisma";


const createBooking = async (
  data: Omit<Booking, "id" | "createdAt" | "updatedAt">,
  userId: string
) => {
  const student = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!student) {
    throw new Error("Student not found");
   }
   const tutor = await prisma.tutorProfile.findFirst({
   include: {
      category:true,
      //availabilitySlot:true
    },
   });
  // console.log(tutor)
  // console.log("first",tutor?.id)

   const result = await prisma.booking.create({
    data: {
      ...data,
      studentId: userId,
      tutorId: tutor?.userId as string
    },
  });

  return result;
  
};

export const BookingService = {
  createBooking,
};