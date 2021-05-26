import CartItem, { ICartItem } from '../../../tasks/module2/task2/CartItem';
import Cart, { ICart } from '../../../tasks/module2/task2/Cart';

describe('Cart tests', () => {
  let cart: ICart;
  let cartItem: ICartItem;
  beforeEach(() => {
    cartItem = new CartItem('Test', 1, 'TestCategory');
    cart = new Cart();
  });
  describe('When invalid arguments are provided', () => {
    it(' - Should Throws an Error if item to add quantity was invalid', () => {
      expect(() => cart.addItemToCart(cartItem, -10)).toThrowError('Invalid item quantity!');
    });

    it(' - Should throws an Error if item to remove quantity was invalid', () => {
      expect(() => cart.removeItemFromCart(cartItem, -5)).toThrowError('Invalid item quantity!');
    });

    it(' - Should throws an Error if item to remove does not exists', () => {
      const item = new CartItem('test', 10);
      expect(() => cart.removeItemFromCart(item, 1)).toThrowError(`Product ${item.name} is not in the cart`);
    });

    it(' - Should Throws an error if try to remove more items than there are in the cart', () => {
      cart.addItemToCart(cartItem, 1);
      expect(() => cart.removeItemFromCart(cartItem, 2)).toThrowError(
        `Item ${cartItem.name} quantity cannot be less than quantity to remove`
      );
    });

    it('  -Should Throws an Error if invalid discount code is provided', () => {
      const invalidDiscountCode: string = 'koszyk12345';

      expect(() => cart.setCartDiscount(invalidDiscountCode)).toThrowError('Invalid discount code');
    });
  });

  describe('When valid arguments are provided', () => {
    it(' - Method Should add item to cart', () => {
      const newCartItem = new CartItem('Test1', 10);

      cart.addItemToCart(newCartItem, 1);

      expect(cart.products).toContain(newCartItem);
    });

    it(' - Method Should correctly sum the items together', () => {
      const newCartItem = new CartItem('Test1', 10);
      const expectedQuantity: number = 2;
      const expectedPrice: number = 20;
      cart.addItemToCart(newCartItem, 1);
      cart.addItemToCart(newCartItem, 1);
      cart.products.map((item) => {
        expect(item.quantity).toStrictEqual(expectedQuantity);
        expect(item.price).toStrictEqual(expectedPrice);
        expect(item.priceOfAllItems).toStrictEqual(expectedPrice);
      });
    });

    it(' - Method Should correctly removes item from cart', () => {
      const cartItem = new CartItem('test', 10);

      cart.addItemToCart(cartItem, 1);
      cart.removeItemFromCart(cartItem, 1);
      expect(cart.products).not.toContain(cartItem);
    });

    it(' - Method should correctly remove few items from cart', () => {
      const cartItem = new CartItem('test', 10);
      const expectedPrice: number = 50;
      const expectedQuantity: number = 5;
      const expectedTotalPrice = 50;
      cart.addItemToCart(cartItem, 10);
      cart.removeItemFromCart(cartItem, 5);

      cart.products.map((item) => {
        expect(item.price).toStrictEqual(expectedPrice);
        expect(item.quantity).toStrictEqual(expectedQuantity);
        expect(item.priceOfAllItems).toStrictEqual(expectedTotalPrice);
      });
    });

    it(' - Cart should correctly sum items price', () => {
      const item1 = new CartItem('test', 10);
      const item2 = new CartItem('test2', 20);
      const item3 = new CartItem('test3', 30);
      const item4 = new CartItem('test4', 40);
      const firstQuantity: number = 1;
      const secondQuantity: number = 2;
      const expectedCartTotalPriceWithQuantity1: number = 100;
      const expectedCartTotalPriceWithQuantity2: number = 200;
      [item1, item2, item3, item4].map((item) => {
        cart.addItemToCart(item, firstQuantity);
      });
      expect(cart.cartPrice).toStrictEqual(expectedCartTotalPriceWithQuantity1);
      [item1, item2, item3, item4].map((item) => {
        cart.addItemToCart(item, secondQuantity);
      });
      expect(cart.cartPrice).toStrictEqual(expectedCartTotalPriceWithQuantity2);
    });

    it(' - Method should correctly set discount', () => {
      const item1 = new CartItem('test', 10);
      const expectedPriceWithDiscount: number = 8.5;
      cart.addItemToCart(item1, 1);
      cart.setCartDiscount('koszyk123');
      expect(cart.cartPrice).toStrictEqual(expectedPriceWithDiscount);
    });
  });
});
