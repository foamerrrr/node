import { prisma } from '../../app.js';

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.json(woods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const readByHardness = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany({
      where: {
        hardness: req.params.hardness,
      },
    });
    res.json(woods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};