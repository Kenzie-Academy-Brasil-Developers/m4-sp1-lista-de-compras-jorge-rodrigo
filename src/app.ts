import express, { Application } from "express";
import {
  CreateProduct,
  deleteProducts,
  deleteProductsItem,
  showProducts,
  updateProductItem,
} from "./logic";
import { verifyExist } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", CreateProduct);
app.get("/purchaseList", showProducts);
app.get("/purchaseList/:id", verifyExist, showProducts);
app.delete("/purchaseList/:id", verifyExist, deleteProducts);
app.delete("/purchaseList/:id/:name", verifyExist, deleteProductsItem);
app.patch("/purchaseList/:id/:name", verifyExist, updateProductItem);

const PORT: number = 3000;
const msg: string = "Server is runnig";

app.listen(PORT, () => console.log(msg));
