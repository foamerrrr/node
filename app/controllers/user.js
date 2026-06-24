import bcrypt from 'bcrypt';
import { prisma } from '../../app.js';
import jwt from 'jsonwebtoken';

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
    return res.status(err.status || 500).json({
      message: err.message || "Some error occured while trying creting user."
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect."
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect."
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      token,
      user: userWithoutPassword,
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some error occured while logging in",
    });
  }
};