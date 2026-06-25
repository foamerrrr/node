import { prisma } from '../../app.js';

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();    
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.json(
      woods.map((wood) => ({
        ...wood,
        links: {
          self: `${baseUrl}/woods/${wood.id}`,
          sameHardness: `${baseUrl}/woods/${wood.hardness}`,
        },
      }))
    );
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
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.json(
      woods.map((wood) => ({
        ...wood,
        links: {
          self: `${baseUrl}/woods/${wood.id}`,
          sameHardness: `${baseUrl}/woods/${wood.hardness}`,
        },
      }))
    );
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
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    woodData.image = image;

    const wood = await prisma.wood.create({
      data: woodData,
    });
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    return res.status(201).json({
    ...wood,
    links: {
      self: `${baseUrl}/woods/${wood.id}`,
      sameHardness: `${baseUrl}/woods/${wood.hardness}`,
    },
  });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};