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

    res.status(201).json(user);
  } catch (error) {
    error.status(500).json({
      name: error.name,
      message: "Error 500 ",
      clientVersion: error.clientVersion,
    });
  }
};

export const login = (req, res) => {
  res.send('You are logged in');
};
