import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

export interface UpdateBookingPayload {
  status?: BookingStatus;
  notes?: string;
  sessionDate?: string;
  slotId?: string;
}

const createBooking = async (
  data: {
    slotId: string;
    sessionDate: Date;
    notes?: string | null;
  },
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

  const slot = await prisma.availabilitySlot.findUnique({
    where: {
      id: data.slotId,
    },
    include: {
      tutor: true,
    },
  });

  if (!slot) {
    throw new Error("Slot not found");
  }

  if (!slot.isActive) {
    throw new Error("This availability slot is not active");
  }

  if (slot.bookedStudents >= slot.maxStudents) {
    throw new Error("This availability slot is full");
  }

  const bookingData = {
    slotId: slot.id,
    studentId: userId,
    tutorId: slot.tutor.userId,
    sessionDate: data.sessionDate,
    notes: data.notes ?? null,
  };

  const result = await prisma.booking.create({
    data: bookingData,
  });

  return result;
};

const getAllBookings = async () => {
  return await prisma.booking.findMany({
    select: {
      id: true,
      sessionDate: true,
      status: true,
      notes: true,
      createdAt: true,
      updatedAt: true,

      student: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true,
        },
      },

      tutor: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,

          tutorProfile: {
            select: {
              qualification: true,
              experience: true,

              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      },

      slot: {
        select: {
          id: true,
          daysOfWeek: true,
          startTime: true,
          endTime: true,
          maxStudents: true,
          bookedStudents: true,
          price: true,
          sessionType: true,
          meetingLink: true,
          isActive: true,
        },
      },

      review: {
        select: {
          rating: true,
          comment: true,
          createdAt: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getBookingById = async (id: string) => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      studentId: true,
      tutorId: true,
      slotId: true,
      sessionDate: true,
      status: true,
      notes: true,
      createdAt: true,
      updatedAt: true,

      student: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true,
        },
      },

      tutor: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,

          tutorProfile: {
            select: {
              qualification: true,
              experience: true,

              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      },

      slot: {
        select: {
          id: true,
          daysOfWeek: true,
          startTime: true,
          endTime: true,
          maxStudents: true,
          bookedStudents: true,
          price: true,
          sessionType: true,
          meetingLink: true,
          isActive: true,
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

  if (!result) {
    throw new Error("Booking not found");
  }

  return result;
};

const updateBooking = async (
  bookingId: string,
  userId: string,
  payload: UpdateBookingPayload
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (
    booking.studentId !== userId &&
    booking.tutorId !== userId
  ) {
    throw new Error(
      "You are not authorized to update this booking"
    );
  }

  if (
    booking.status === BookingStatus.COMPLETED ||
    booking.status === BookingStatus.CANCELLED ||
    booking.status === BookingStatus.REJECTED
  ) {
    throw new Error(
      `You cannot update a ${booking.status.toLowerCase()} booking`
    );
  }

  const updateData: {
    status?: BookingStatus;
    sessionDate?: Date;
    notes?: string | null;
    slotId?: string;
  } = {};

  if (payload.status !== undefined) {
    updateData.status = payload.status;
  }

  if (payload.sessionDate !== undefined) {
    const sessionDate = new Date(payload.sessionDate);

    if (isNaN(sessionDate.getTime())) {
      throw new Error("Invalid session date");
    }

    updateData.sessionDate = sessionDate;
  }

  if (payload.notes !== undefined) {
    updateData.notes = payload.notes;
  }

  if (payload.slotId !== undefined) {
    const slot = await prisma.availabilitySlot.findUnique({
      where: {
        id: payload.slotId,
      },
    });

    if (!slot) {
      throw new Error("Availability slot not found");
    }

    if (!slot.isActive) {
      throw new Error(
        "This availability slot is not active"
      );
    }

    if (slot.bookedStudents >= slot.maxStudents) {
      throw new Error(
        "This availability slot is full"
      );
    }

    updateData.slotId = payload.slotId;
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error("No data provided for update");
  }

  const updatedBooking =
    await prisma.booking.update({
      where: {
        id: bookingId,
      },

      data: updateData,

      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },

        tutor: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,

            tutorProfile: {
              select: {
                qualification: true,
                experience: true,

                category: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },
        },

        slot: {
          select: {
            id: true,
            daysOfWeek: true,
            startTime: true,
            endTime: true,
            maxStudents: true,
            bookedStudents: true,
            price: true,
            sessionType: true,
            meetingLink: true,
            isActive: true,
          },
        },

        review: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
          },
        },
      },
    });

  return updatedBooking;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
};