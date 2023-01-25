import { iProducts } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      product: iProducts;
    }
  }
}
