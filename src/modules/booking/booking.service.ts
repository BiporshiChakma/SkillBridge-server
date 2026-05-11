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

const getUserBookings = async (userId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      studentId: userId,
    },
    select: {
      id: true,
      sessionDate: true,
      status: true,

      tutor: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },

      slot: {
        select: {
          dayOfWeek: true,
          startTime: true,
          endTime: true,
          isBooked: true,
        },
      },

      review: {
        select: {
          studentId: true,
          rating: true,
          comment: true,
          createdAt: true,
        },
      },
    },
  });

  return result;
};
const getBookingById = async (id: string) => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      sessionDate: true,
      status: true,

      tutor: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },

      slot: {
        select: {
          dayOfWeek: true,
          startTime: true,
          endTime: true,
          isBooked: true,
        },
      },

      review: {
        select: {
          studentId: true,
          rating: true,
          comment: true,
          createdAt: true,
        },
      },
    },
  });

  return result;
};

export const BookingService = {
  createBooking,getUserBookings,getBookingById
};