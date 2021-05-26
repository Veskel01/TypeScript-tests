import is from 'is_js';
import { v4 as uuidv4 } from 'uuid';

const errorHandler = (error: string): void => {
  throw new Error(error);
};

const throwErrorOnEmptyValue = <T>(value: T): void => {
  if (is.empty(value)) {
    errorHandler('Value cannot be empty!');
  } else if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      errorHandler('Value cannot be NaN!');
    }
  }
};

type ModifyFunctionKeys = 'name' | 'price' | 'category' | 'discount';
type AllowedValues = string | number;

export type changeItemPriceBasedOnQuantity = 'remove' | 'add';

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
  private basicPrice: number;
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
    this.basicPrice = price;
  }

  public modify(key: ModifyFunctionKeys, value: AllowedValues): string | number | void {
    throwErrorOnEmptyValue(value);
    if (typeof value === 'string') {
      if (key === 'name') {
        return (this.name = value);
      } else if (key === 'category') {
        return (this.category = value);
      }
    }
    if (typeof value === 'number') {
      if (key === 'price') {
        if (value < 0) throw new Error('New Price cannot be less than 0');
        this.basicPrice = value;
        return (this.price = value);
      } else if (key === 'discount') {
        value > 100 || value < 0 ? errorHandler('Invalid Discount') : (this.discount = value);
        const price: number = this.price;
        const totalValue: number = price - (price * value) / 100;
        this.price = totalValue;
        return (this.priceOfAllItems = totalValue);
      }
    }
    return errorHandler('Invalid type');
  }

  public changeItemPriceBasedOnQuantity(key: changeItemPriceBasedOnQuantity, itemQuantity: number): void {
    if (key === 'add') {
      if (itemQuantity < 0) {
        throw new Error('You cannot add a quantity less than 0');
      }
      this.quantity = itemQuantity === 1 ? (this.quantity += itemQuantity) : (this.quantity = itemQuantity);
      this.price *= this.quantity;
    }
    if (key !== 'add') {
      const quantityAfterChange = (this.quantity -= itemQuantity);
      if (quantityAfterChange < 0) {
        throw new Error('Quantity of item cannot be less than 0');
      }
      this.price = this.quantity * this.basicPrice;
      this.priceOfAllItems = this.quantity * this.basicPrice;
    }
  }
}

export default CartItem;
