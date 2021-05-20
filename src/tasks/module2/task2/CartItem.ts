import is from "is_js";
import { v4 as uuidv4 } from "uuid";

const errorHandler = (error: string): void => {
  throw new Error(error);
};

const throwErrorOnEmptyValue = <T>(value: T): void => {
  if (is.empty(value)) {
    errorHandler("Value cannot be empty!");
  } else if (typeof value === "number") {
    if (is.empty(value) || Number.isNaN(value)) {
      errorHandler("Value cannot be empty or NaN!");
    }
  }
};

type ModifyFunctionKeys = "name" | "price" | "category" | "discount";
type AllowedValues = string | number;

export type changeItemPriceBasedOnQuantity = "remove" | "add";

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  category?: string;
  numberOfItems?: number;
  discount: number;
  quantity: number;
  priceOfAllItems: number;
  modify: (key: ModifyFunctionKeys, value: AllowedValues) => string | number | void;
  changeItemPriceBasedOnQuantity: (key: changeItemPriceBasedOnQuantity, quantity: number) => void;
}

class CartItem implements ICartItem {
  public id: string;
  public name: string;
  public price: number;
  public category?: string;
  public discount: number;
  public quantity: number;
  public priceOfAllItems: number;
  constructor(name: string, price: number, category?: string) {
    this.id = uuidv4();
    throwErrorOnEmptyValue(name);
    this.name = name;
    throwErrorOnEmptyValue(price);
    this.price = price;
    this.category = category;
    this.discount = 0;
    this.quantity = 0;
    this.priceOfAllItems = this.price;
  }

  public modify(key: ModifyFunctionKeys, value: AllowedValues): string | number | void {
    throwErrorOnEmptyValue(value);
    if (typeof value === "string") {
      if (key === "name") {
        return (this.name = value);
      } else if (key === "category") {
        return (this.category = value);
      }
    }
    if (typeof value === "number") {
      if (key === "price") {
        return (this.price = value);
      } else if (key === "discount") {
        value > 100 || value < 0 ? errorHandler("Invalid Discount") : (this.discount = value);
        return (this.price = this.price - (this.price * value) / 100);
      }
    }
    return errorHandler("Invalid type");
  }

  public changeItemPriceBasedOnQuantity(
    key: changeItemPriceBasedOnQuantity,
    itemQuantity: number
  ): void {
    if (key === "add") {
      this.quantity += itemQuantity;
    } else {
      this.quantity -= itemQuantity;
    }
  }
}

export default CartItem;
