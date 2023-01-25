type tProductsKeys = "listName" | "data";
type tDataKeys = "name" | "quantity";

interface iData {
  name: string;
  quantity: string;
}

interface iProducts {
  id: number;
  listName: string;
  data: iData[];
}

export { iProducts, tProductsKeys, tDataKeys, iData };
