import { apiKey, cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  await middleware(req, res, cors);
  apiKey(req, res);

  if (req.method === "PUT" || req.method === "PATCH") {
    const { judul, deskripsi, ayat, latin } = req.body;
    const { id } = req.query;
    try {
      const updateProduct = await prisma.doa.update({
        where: {
          id: Number(id),
        },
        data: {
          judul,
          deskripsi,
          ayat,
          latin,
        },
      });
      res.status(200).json({
        message: "Success",
        data: updateProduct,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
