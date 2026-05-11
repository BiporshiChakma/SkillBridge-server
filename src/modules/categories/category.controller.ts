import { Request, Response } from "express";
import { CategoryService } from "./category.service";


const createCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body)

 try{
 res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: result,
  });
 }catch(error:any){
   res.status(400).json({
      success: false,
      message: "Category Creation failed",
      data: error.message,
    });
 }
};

const getAllCategories = async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();
   try{
 res.status(201).json({
    success: true,
    message: "Data Fetched successfully",
    data: result,
  });}catch(error:any){
      res.status(400).json({
      success: false,
      message: "Data Fetched failed",
      data: error.message,
    });
  }
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