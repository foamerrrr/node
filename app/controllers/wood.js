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

export const create = async (req, res) => {
  try {
    let woodData;

    if (req.body.datas) {
      woodData = JSON.parse(req.body.datas);
    } else {
      woodData = req.body;
    }

    const image = req.file
      ? req.file.filename
      : woodData.image ?? null;

    woodData.image = image;

    const wood = await prisma.wood.create({
      data: woodData,
    });

    return res.status(201).json({
      message: "Wood created",
      data: wood,
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};