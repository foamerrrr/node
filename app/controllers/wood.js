import { prisma } from '../../app.js';

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.json(woods);
  } catch (error) {
    return res.status(err.status || 500).json({
      message: err.message || "Some error occured while trying to fetch wood."
    });
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
    } catch (error) {
    return res.status(err.status || 500).json({
      message: err.message || "Some error occured while trying to fetch wood."
    });
  }
};