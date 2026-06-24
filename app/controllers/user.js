import bcrypt from 'bcrypt';
import { prisma } from '../../app.js';

export const signup = async (req, res) => {
  try {
    const data = req.body;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(err.status(500)).json({
      message: "Some error occured while trying creting user."
    });
  }
};

export const login = (req, res) => {
  res.send('You are logged in');
};
