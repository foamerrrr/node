import { prisma } from "../../app.js";

const getBaseUrl = (req) => `${req.protocol}://${req.get("host")}`;

const withLinks = (wood, req) => ({
  ...wood,
  links: {
    self: `${getBaseUrl(req)}/woods/${wood.id}`,
    sameHardness: `${getBaseUrl(req)}/woods/${wood.hardness}`,
  },
});

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();

    res.json(woods.map((wood) => withLinks(wood, req)));
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

    res.json(woods.map((wood) => withLinks(wood, req)));
  } catch (error) {
    return res.status(err.status || 500).json({
      message: err.message || "Some error occured while trying to fetch wood."
    });
  }
};

export const create = async (req, res) => {
  try {
    const woodData = req.body.datas
      ? JSON.parse(req.body.datas)
      : req.body;

    woodData.image = req.file
      ? `${getBaseUrl(req)}/uploads/${req.file.filename}`
      : null;

    const wood = await prisma.wood.create({
      data: woodData,
    });

    return res.status(201).json(withLinks(wood, req));
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};