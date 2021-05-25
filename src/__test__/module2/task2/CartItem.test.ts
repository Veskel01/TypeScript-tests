import CartItem from '../../../tasks/module2/task2/CartItem';

describe('CartItem test', () => {
  let item: CartItem;
  beforeAll(() => {
    item = new CartItem('Test', 10, 'TestCategory');
  });

  describe('When invalid arguments are provided', () => {
    it(' - Should throws an Error if second argument is empty', () => {
      expect(() => item.modify('name', '')).toThrowError('Value cannot be empty!');
      expect(() => item.modify('category', '')).toThrowError('Value cannot be empty!');
    });

    it(' - Should Throws an Error if number is NaN', () => {
      expect(() => item.modify('price', NaN)).toThrowError('Value cannot be NaN!');
      expect(() => item.modify('discount', NaN)).toThrowError('Value cannot be NaN!');
    });

    it(' - Should Throws an Error if new value is less than 0 or if invalid discount is provided', () => {
      expect(() => item.modify('price', -10)).toThrowError('New Price cannot be less than 0');
      expect(() => item.modify('discount', -1)).toThrowError('Invalid Discount');
      expect(() => item.modify('discount', 101)).toThrowError('Invalid Discount');
    });

    it(' - Should Throws an Erorr if number is provided to modify name or category', () => {
      const numberAsName: number = 15;
      expect(() => item.modify('category', numberAsName)).toThrowError('Invalid type');
      expect(() => item.modify('name', numberAsName)).toThrowError('Invalid type');
    });

    it(' - Should Throws an Error if string is provied to modify price or discount', () => {
      const stringAsPriceOrDiscount: string = 'FakePrice';
      expect(() => item.modify('price', stringAsPriceOrDiscount)).toThrowError('Invalid type');

      expect(() => item.modify('discount', stringAsPriceOrDiscount)).toThrowError('Invalid type');
    });

    it(' - Should Throws an Error when try to add quantity less than 0', () => {
      expect(() => item.changeItemPriceBasedOnQuantity('add', -5)).toThrowError(
        'You cannot add a quantity less than 0'
      );
    });

    it(' - Should Thrwos an Error if item quantity after remove will be less than 0', () => {
      expect(() => item.changeItemPriceBasedOnQuantity('remove', 10)).toThrowError(
        'Quantity of item cannot be less than 0'
      );
    });

    describe('When valid arguments are provided:', () => {
      it(' - Should set id as UUID ', () => {});
      it(' - Test', () => {});
    });
  });
});
