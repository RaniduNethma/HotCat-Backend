import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import DB from "../../configs/dbConfig.js";
import * as types from "../../types/types.js";
import { JWT_SECRET } from "../../configs/envConfig.js";

export const createStaffUser = async (
  userName: string,
  name: string,
  phone: string,
  email: string,
  password: string,
) => {
  const existingStaffUser = await DB.staff.findUnique({
    where: { userName: userName },
  });

  if (existingStaffUser != null) {
    return {
      statusCode: 409,
      message: "Username already exists",
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaffUser = await DB.staff.create({
      data: {
        userName: userName,
        name: name,
        phone: phone,
        email: email ?? null,
        password: hashedPassword,
        role: types.Role.WAITER,
      },
    });

    const savedStaffUser = await DB.staff.findUnique({
      where: { userName: userName },
      select: {
        userName: true,
        name: true,
        phone: true,
        email: true,
        role: true,
      },
    });

    return {
      statusCode: 200,
      message: "Registration successful",
      user: savedStaffUser,
    };
  }
  catch (error) {
    console.error("Error executing registration", error);
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
};

export const staffUserLogin = async (userName: string, password: string) => {
  try {
    const staffUser = await DB.staff.findUnique({
      where: { userName: userName },
      select: {
        id: true,
        userName: true,
        role: true,
        password: true,
      },
    });

    if (!staffUser) {
      return {
        statusCode: 401,
        message: "Invalid email or password",
      };
    }

    const isMatch = await bcrypt.compare(password, staffUser.password);

    if (!isMatch) {
      return {
        statusCode: 400,
        message: "Invalid email or password",
      };
    }

    const staffUserData = await DB.staff.findUnique({
      where: { userName: userName },
      select: {
        id: true,
        userName: true,
        name: true,
        phone: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const token = Jwt.sign(
      { id: staffUser.id, role: staffUser.role },
      JWT_SECRET!,
    );

    return {
      statusCode: 200,
      message: "Login successfull",
      user: staffUserData,
      token,
    };
  }
  catch (error) {
    console.error("Error executing login", error);
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
};
