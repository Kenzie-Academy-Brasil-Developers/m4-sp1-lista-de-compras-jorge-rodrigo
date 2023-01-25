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
app.use("/purchaseList/:id", verifyExist);

app.post("/purchaseList", CreateProduct);
app.get("/purchaseList", showProducts);
app.get("/purchaseList/:id", showProducts);
app.delete("/purchaseList/:id", deleteProducts);
app.delete("/purchaseList/:id/:name", deleteProductsItem);
app.patch("/purchaseList/:id/:name", updateProductItem);

const PORT: number = 3000;
const msg: string = "Server is runnig";

app.listen(PORT, () => console.log(msg));
