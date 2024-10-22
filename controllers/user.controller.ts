import { Request, Response } from "express";
import User from "../models/User.model";

const getUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default { getUser };
