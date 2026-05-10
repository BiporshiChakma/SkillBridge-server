import {prisma} from "../../lib/prisma";


const createCategory = async (payload: { name: string; slug: string }) => {
  const result = await prisma.category.create({
    data: payload,
  });
console.log(result)
  return result;
};

const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: {
      tutorProfiles: true,
    },
  });
};


export const CategoryService = {
  createCategory,
  getAllCategories,

};