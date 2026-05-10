import { Request, Response } from "express";
import { ReviewService } from "./review.service";


const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const result = await ReviewService.createReview(req.body, userId as string);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create review",
    });
  }
};

export const ReviewController = {
  createReview,
};