import {prisma} from "../../lib/prisma";

const createTutorProfile = async (
  userId: string,
  payload: any
) => {

  // check existing profile
  const existingTutor = await prisma.tutorProfile.findUnique({
    where: {
      userId,
    },
  });

  if (existingTutor) {
    throw new Error("Tutor profile already exists");
  }

  // check category
  const category = await prisma.category.findUnique({
    where: {
      slug: payload.category,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  // create profile
  const result = await prisma.tutorProfile.create({
    data: {
      userId,
      categoryId: category.id,
      bio: payload.bio,
      qualification: payload.qualification,
      experience: payload.experience,
      hourlyRate: payload.hourlyRate,
    },
  });

  return result;
};
const getAllTutors = async (
  searchTerm?: string,
  category?: string
) => {

  const result = await prisma.tutorProfile.findMany({
    where: {

      ...(category && {
        category: {
          slug: category,
        },
      }),

      ...(searchTerm && {
        OR: [

          // search by subject/category name
          {
            category: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },

          // search by tutor name
          {
            user: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },

        ],
      }),
    },

    select: {
      id: true,
      bio: true,
      qualification: true,
      experience: true,
      hourlyRate: true,
      averageRating: true,

      user: {
        select: {
          name: true,
          email: true,
        },
      },

      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  return result;
};

const updateTutorProfile = async (
  userId: string,
  data: any
) => {
  const tutor = await prisma.tutorProfile.findFirst({
    where: {
      userId,
    },
  });

  if (!tutor) {
    throw new Error("Tutor profile not found");
  }

  const result = await prisma.tutorProfile.update({
    where: {
      id: tutor.id,
    },
    data,
  });

  return result;
};



export const TutorService = {
  createTutorProfile,getAllTutors,updateTutorProfile
};


