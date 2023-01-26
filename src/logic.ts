import { Response, Request } from "express";
import { products } from "./database";
import { iData, iProducts, tDataKeys, tProductsKeys } from "./interfaces";

const CreateProduct = (req: Request, res: Response): Response => {
  try {
    const validData = validateData(req.body);
    let getId = 0;
    if (products.length <= 0) {
      getId = 1;
    }
    if (products.length > 0) {
      getId = products[products.length - 1].id + 1;
    }
    const validatedData: iProducts = {
      ...validData,
      id: getId,
    };

    products.push(validatedData);

    return res.status(201).json(validatedData);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err });
  }
};

const showProducts = (req: Request, res: Response): Response => {
  const id = req.params.id;

  if (id) {
    const prod = req.product;
    return res.status(200).json(prod);
  }

  return res.status(200).json(products);
};

const deleteProductsItem = (req: Request, res: Response): Response => {
  const id = req.params.id;
  const name = req.params.name;

  const item = products.find((item) => item.id === Number(id));
  if (item) {
    const data: number = item.data.findIndex((data) => data.name === name);
    const verifyExits = item.data.some((item) => item.name === name);
    if (verifyExits) {
      item?.data.splice(data, 1);
      return res.status(204).json();
    }
    res.status(404).json({
      message: `Item with name ${name} does not exist`,
    });
  }
  return res.status(404).json({
    message: `List with id ${id} does not exist`,
  });
};

const deleteProducts = (req: Request, res: Response): Response => {
  const id = req.params.id;

  const item = products.find((item) => item.id === Number(id));
  if (item) {
    const itemIndex = products.findIndex((item) => item.id === Number(id));
    products.splice(itemIndex, 1);
    return res.status(204).json();
  }
  return res.status(404).json({
    message: `List with id ${id} does not exist`,
  });
};

const validateData = (payload: any): iProducts => {
  const payloadKeys: string[] = Object.keys(payload);
  const payloadValues: string[] = Object.values(payload);
  const requiredKeys: tProductsKeys[] = ["listName", "data"];
  const dataRequiredKeys: tDataKeys[] = ["name", "quantity"];

  const hasRequiredKeys = requiredKeys.every((key) =>
    payloadKeys.includes(key)
  );
  if (payload.data) {
    const data = payload.data;

    data.forEach((item: iData) => {
      const itemKeys: string[] = Object.keys(item);

      const hasRequiredDataKeys = dataRequiredKeys.every((key) =>
        itemKeys.includes(key)
      );

      if (!hasRequiredDataKeys) {
        const joinedKeys: string = dataRequiredKeys.join(", ");
        throw new Error(`Required keys are ${joinedKeys}.`);
      }

      const verifyNewDataKeys =
        JSON.stringify(dataRequiredKeys) === JSON.stringify(itemKeys);

      if (!verifyNewDataKeys) {
        const joinedKeys: string = dataRequiredKeys.join(", ");
        throw new Error(
          `Adicional keys are detected, required keys are: ${joinedKeys}.`
        );
      }
    });
  }

  if (!hasRequiredKeys) {
    const joinedKeys: string = requiredKeys.join(", ");
    throw new Error(`Required keys are ${joinedKeys}.`);
  }
  payloadValues.forEach((item) => {
    if (typeof item !== "string" && typeof item !== "object") {
      throw new Error("The list name need to be a string");
    }
  });

  const verifyNewKeys =
    JSON.stringify(requiredKeys) === JSON.stringify(payloadKeys);

  if (!verifyNewKeys) {
    const joinedKeys: string = requiredKeys.join(", ");
    throw new Error(
      `Adicional keys are detected, required keys are: ${joinedKeys}.`
    );
  }
  return payload;
};

const updateProductItem = (req: Request, res: Response): Response => {
  const id = req.params.id;
  const name = req.params.name;
  let item = products.find((item) => item.id === Number(id));
  if (item) {
    try {
      const verifyExits = item.data.some((item) => item.name === name);
      const verifyIndex = item.data.findIndex((item) => item.name === name);
      const validData = validateUpdateData(req.body);
      if (verifyExits) {
        item.data[verifyIndex] = { ...item.data[verifyIndex], ...validData };
        return res.status(200).json(item);
      }
      return res.status(404).json({ message: "item not found" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err });
    }
  }
  return res.status(404).json({ message: "product not found" });
};

const validateUpdateData = (payload: any): iData => {
  const payloadKeys: string[] = Object.keys(payload);
  const payloadValues: string[] = Object.values(payload);
  const requiredKeys: tDataKeys[] = ["name", "quantity"];

  payloadValues.forEach((item) => {
    if (typeof item !== "string") {
      throw new Error("The list name need to be a string");
    }
  });
  const hasRequiredKeys = requiredKeys.some((key) => payloadKeys.includes(key));

  if (!hasRequiredKeys) {
    const joinedKeys: string = requiredKeys.join(", ");
    throw new Error(`Required keys are ${joinedKeys}.`);
  }

  return payload;
};

export {
  CreateProduct,
  showProducts,
  deleteProductsItem,
  deleteProducts,
  updateProductItem,
};
