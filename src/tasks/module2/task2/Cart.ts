import { v4 as uuidv4 } from 'uuid';
import { ICartItem, changeItemPriceBasedOnQuantity } from './CartItem';

const errorHandler = (error: string) => {
  throw new Error(error);
};

const throwErrorOnInvalidQuantity = (
  itemInCart: ICartItem,
  quantity: number,
  key: changeItemPriceBasedOnQuantity
): void => {
  if (quantity < 0) {
    errorHandler('Invalid item quantity!');
  } else if (itemInCart.quantity < quantity && key === 'remove' && itemInCart.quantity !== 0) {
    errorHandler(`Item ${itemInCart.name} quantity cannot be less than quantity to remove`);
  }
};

export interface ICart {
  id: string;
  cartPrice: number;
  cartDiscount: number;
  products: ICartItem[];
  addItemToCart: (item: ICartItem, quantity: number) => void;
  removeItemFromCart: (item: ICartItem, quantity: number) => void;
  setCartDiscount: (discountCode: string) => void;
}

class Cart implements ICart {
  public id: string;
  public cartDiscount: number;
  public cartPrice: number;
  private _products: ICartItem[];
  constructor() {
    this.id = uuidv4();
    this._products = [];
    this.cartDiscount = 0;
    this.cartPrice = 0;
  }

  get products() {
    return this._products;
  }

  private _checkIfItemInCart(item: ICartItem): number {
    const findDuplicatedItem: number = this._products.findIndex((itemInCart: ICartItem) => {
      return itemInCart.id === item.id;
    });
    return findDuplicatedItem;
  }

  private getCartPrice(): number {
    const listOfAllPrices: number[] = [];
    this._products.forEach((item: ICartItem) => {
      const { priceOfAllItems } = item;
      listOfAllPrices.push(priceOfAllItems);
    });
    const changeCartPrice: number = listOfAllPrices.reduce(
      (acc: number, current: number) => (acc += current)
    );
    return (this.cartPrice = changeCartPrice);
  }

  public addItemToCart(item: ICartItem, quantity: number): void {
    throwErrorOnInvalidQuantity(item, quantity, 'add');
    const index: number = this._checkIfItemInCart(item);
    if (index === -1) {
      item.changeItemPriceBasedOnQuantity('add', quantity);
      item.priceOfAllItems *= item.quantity;
      this._products.push(item);
    } else {
      this._products[index].changeItemPriceBasedOnQuantity('add', quantity);
      this._products[index].priceOfAllItems *= this._products[index].quantity;
    }
    this.getCartPrice();
  }

  public removeItemFromCart(item: ICartItem, quantity: number): ICartItem[] | void {
    throwErrorOnInvalidQuantity(item, quantity, 'remove');
    const index: number = this._checkIfItemInCart(item);
    if (index !== -1 && item.quantity !== quantity) {
      item.changeItemPriceBasedOnQuantity('remove', quantity);
    } else if (index !== -1 && item.quantity === quantity) {
      return this._products.splice(index, 1);
    } else {
      errorHandler(`Product ${item.name} is not in the cart`);
    }
    this.getCartPrice();
  }

  public setCartDiscount(discountCode: string): void {
    if (discountCode === 'koszyk123') {
      this.cartDiscount = 15;
      this.cartPrice = this.cartPrice - (this.cartPrice * this.cartDiscount) / 100;
    } else {
      errorHandler(`Invalid discount code`);
    }
  }
}

export default Cart;
