import { Booking } from "../../../generated/prisma/client";
import {prisma} from "../../lib/prisma";


type TCreateBooking = Omit<
 Booking,
  "id" | "status" | "createdAt" | "updatedAt" | "sessionDate"
> & {
  sessionDate: string;
};

const createBooking = async (payload: TCreateBooking) => {
  const result = await prisma.booking.create({
    data: {
      studentId: payload.studentId,
      tutorId: payload.tutorId,
      slotId: payload.slotId,
      sessionDate: new Date(payload.sessionDate),
      ...(payload.notes !== undefined && { notes: payload.notes }),
    },
  });

  return result;
};

export const BookingService = {
  createBooking,
};