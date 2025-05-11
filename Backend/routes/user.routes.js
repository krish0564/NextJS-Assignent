import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";
import { userValidationSchema } from "../validations/user.validation.js";

const router = express.Router();

const validateUser = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", validateUser, createUser);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;