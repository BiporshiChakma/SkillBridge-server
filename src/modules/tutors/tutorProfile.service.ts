import {prisma} from "../../lib/prisma";

const createTutorProfile = async (userId: string, payload: any) => {
  
  const category = await prisma.category.findUnique({
    where: { slug:payload.subject},
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const existing = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (existing) {
    throw new Error("Tutor profile already exists");
  }

  return prisma.tutorProfile.create({
    data: {
      bio: payload.bio,
      qualification: payload.qualification,
      experience: payload.experience,
      hourlyRate: payload.hourlyRate,

      user: {
        connect: { id: userId },
      },

      category: {
        connect: { id: category?.id},
      },
    },
  });
};

const getprofile = async(userId:string)=>{
  const result = await prisma.tutorProfile.findMany({
  where:{
    userId
  },
   include: {
      user: true,
      category:true
    },
  })
return result;
}



export const TutorService = {
  createTutorProfile,getprofile
};


