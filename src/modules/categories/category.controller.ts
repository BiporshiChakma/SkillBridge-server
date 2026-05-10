import { Request, Response } from "express";
import { CategoryService } from "./category.service";


const createCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body)

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: result,
  });
};

const getAllCategories = async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();

  res.json({
    success: true,
    data: result,
  });
};

// const getSingleCategory = async (req: Request, res: Response) => {
//   const result = await CategoryService.getSingleCategory(req.params.id);

//   res.json({
//     success: true,
//     data: result,
//   });
// };

export const CategoryController = {
  createCategory,
  getAllCategories
};