import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {

  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      phone: true,
      profileImage: true,
      createdAt: true,
    },
  });

  return result;
};

const updateUserStatus = async (
  id: string,
  data: any
) => {

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: data.status,
    },
  });

  return result;
};

export const AdminServices = {
  getAllUsers,
  updateUserStatus 
};