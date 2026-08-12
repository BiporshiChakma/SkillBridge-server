import { prisma } from "../../lib/prisma";

 const createSlot = async (userId: string, payload: any) => {
  // 1. Validate required fields FIRST before making DB queries
  if (!payload.daysOfWeek) throw new Error("Days of week is required");
  if (!payload.startTime) throw new Error("Start time is required");
  if (!payload.endTime) throw new Error("End time is required");
  if (payload.price === undefined || payload.price === null) throw new Error("Price is required");
  if (!payload.sessionType) throw new Error("Session type is required");

  // 2. Find Tutor Profile
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!tutorProfile) {
    throw new Error("Tutor profile not found. Please create your tutor profile first.");
  }

  // 3. Duplicate slot check
  const existingSlot = await prisma.availabilitySlot.findFirst({
    where: {
      tutorId: tutorProfile.id,
      daysOfWeek: payload.daysOfWeek,
      startTime: payload.startTime,
      endTime: payload.endTime,
    },
  });

  if (existingSlot) {
    throw new Error("This slot already exists");
  }

  // 4. Create slot
  const slot = await prisma.availabilitySlot.create({
    data: {
      tutorId: tutorProfile.id,
      daysOfWeek: payload.daysOfWeek,
      startTime: payload.startTime,
      endTime: payload.endTime,
      maxStudents: Number(payload.maxStudents ?? 50),
      bookedStudents: 0,
      price: payload.price,
      meetingLink: payload.meetingLink || null,
      sessionType: payload.sessionType,
      isActive: true,
    },
    include: {
      tutor: {
        include: {
          user: true,
          category: true,
        },
      },
    },
  });

  return slot;
};

// 
// 
// async (userId: string, payload: any) => {
//   // Find tutor profile by logged-in user
//   const profile = await prisma.tutorProfile.findUnique({
//     where: {
//       userId,
//     },
//   });

//   if (!profile) {
//     throw new Error("Tutor profile not found");
//   }

//   // Check duplicate slot
//   const existingSlot = await prisma.availabilitySlot.findFirst({
//     where: {
//       tutorId: profile.id,
//       daysOfWeek: payload.daysOfWeek,
//       startTime: payload.startTime,
//       endTime: payload.endTime,
//     },
//   });

//   if (existingSlot) {
//     throw new Error("This slot already exists");
//   }

//   return await prisma.availabilitySlot.create({
//     data: {
//       tutorId: profile.id,
//       daysOfWeek: payload.daysOfWeek,
//       startTime: payload.startTime,
//       endTime: payload.endTime,
//       maxStudents: payload.maxStudents ?? 50,
//       bookedStudents: 0,
//       price: payload.price,
//       meetingLink: payload.meetingLink,
//       sessionType: payload.sessionType,
//       isActive: true,
//     },
//   });
// };

const getMySlots = async (userId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("Tutor profile not found");
  }

  return await prisma.availabilitySlot.findMany({
    where: {
      tutorId: profile.id,
    },
    include: {
      bookings: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// const getSingleSlot = async (id: string) => {
//   return await prisma.availabilitySlot.findUnique({
//     where: { id },
//     include: {
//       bookings: true,
//     },
//   });
// };

const updateSlot = async (id: string, payload: any) => {
  return await prisma.availabilitySlot.update({
    where: { id },
    data: payload,
  });
};
// const getAllSlots = async () => {
//   return await prisma.availabilitySlot.findMany({
//     include: {
//       tutor: {
//         include: {
//           user: true,
//           category: true,
//         },
//       },
//       bookings: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// };
const deleteSlot = async (id: string) => {
  return await prisma.availabilitySlot.delete({
    where: { id },
  });
};

const getAllSlots = async () => {
  return await prisma.availabilitySlot.findMany({
    where: {
      isActive: true,
    },
    include: {
      tutor: {
        include: {
          user: true,
          category: true,
        },
      },
    },
  });
};

const getSingleSlot = async (id: string) => {
  const slot = await prisma.availabilitySlot.findUnique({
    where: {
      id,
    },
    include: {
      tutor: {
        include: {
          user: true,
          category: true,
        },
      },
    },
  });

  if (!slot) {
    throw new Error("Slot not found");
  }

  return slot;
};

export const AvailabilityService = {
  createSlot,
  getMySlots,
  getSingleSlot,
  updateSlot,
  deleteSlot,
  getAllSlots

};