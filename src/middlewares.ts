import { NextFunction, Request, Response } from "express";
import { products } from "./database";
import { iProducts } from "./interfaces";

const verifyExist = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const product: iProducts | undefined = products.find(
    (prod) => Number(prod.id) === Number(req.params.id)
  );
  if (!product) {
    return res.status(404).json({ message: "Product not Found" });
  }
  req.product = product;

  return next();
};

export { verifyExist };
