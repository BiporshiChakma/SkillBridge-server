import { Request, Response } from "express";
import { AdminServices } from "./admin.service";

const getAllUsers = async (
  req: Request,
  res: Response
) => {

  try {

    const result = await AdminServices.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });

  }

};

const updateUserStatus = async (
  req: Request,
  res: Response
) => {

  try {

    const id = req.params.id;

    const result = await AdminServices.updateUserStatus(
      id as string,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

export const AdminController = {
  getAllUsers,
  updateUserStatus
};