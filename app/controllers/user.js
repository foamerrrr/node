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
    res.status(400).json({
      name: error.name,
      message: error.message,
      clientVersion: error.clientVersion,
    });
  }
};

export const login = (req, res) => {
  res.send('You are logged in');
};
