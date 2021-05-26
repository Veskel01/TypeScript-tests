import CartItem from '../../../tasks/module2/task2/CartItem';
import validator from 'validator';

describe('CartItem test', () => {
  let item: CartItem;
  beforeAll(() => {
    item = new CartItem('Test', 10, 'TestCategory');
  });

  describe('When invalid arguments are provided', () => {
    it(' - Should throws an Error if value in modify method is empty', () => {
      const value: string = '';

      expect(() => item.modify('name', value)).toThrowError('Value cannot be empty!');
      expect(() => item.modify('category', 'value')).toThrowError('Value cannot be empty!');
    });

    it(' - Should Throws an Error if value is NaN', () => {
      const value = NaN;

      expect(() => item.modify('price', value)).toThrowError('Value cannot be NaN!');
      expect(() => item.modify('discount', value)).toThrowError('Value cannot be NaN!');
    });

    it(' - Should Throws an Error if new price is less than ', () => {
      const value: number = -5;

      expect(() => item.modify('price', value)).toThrowError('New Price cannot be less than 0');
    });

    it(' - Shou;d throws an error if discount is less than 0 or greater than 100', () => {
      const lessThan0Discount = -5;
      const greaterThan100Discount = 101;

      expect(() => item.modify('discount', lessThan0Discount)).toThrowError('Invalid Discount');

      expect(() => item.modify('discount', greaterThan100Discount)).toThrowError('Invalid Discount');
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
      const quantity: number = -5;

      expect(() => item.changeItemPriceBasedOnQuantity('add', quantity)).toThrowError(
        'You cannot add a quantity less than 0'
      );
    });

    it(' - Should Thrwos an Error if item quantity after remove will be less than 0', () => {
      const itemsToRemoveQuantity: number = 10;

      expect(() => item.changeItemPriceBasedOnQuantity('remove', itemsToRemoveQuantity)).toThrowError(
        'Quantity of item cannot be less than 0'
      );
    });

    describe('When valid arguments are provided:', () => {
      it(' - Should set id as UUID ', () => {
        expect(validator.isUUID(item.id)).toBeTruthy();
      });
      it(' - Method should modify item name ', () => {
        const newNames: string[] = ['test1', 'test2', 'test3', 'test4'];
        newNames.map((value) => {
          item.modify('name', value);
          expect(item.name).toStrictEqual(value);
        });
      });

      it(' - Method should modify item category', () => {
        const newCategories: string[] = ['category1', 'category2', 'category3', 'category4'];
        newCategories.map((category) => {
          item.modify('category', category);
          expect(item.category).toStrictEqual(category);
        });
      });

      it(' - Method should correctly change item price ', () => {
        const newPrices: number[] = [50.62, 434.48, 828.84, 417.43];
        newPrices.map((price) => {
          item.modify('price', price);
          expect(item.price).toStrictEqual(price);
        });
      });

      it(' - Method should correctly modify item discount', () => {
        const discounts: number[] = [10, 15, 20, 25, 30];
        discounts.map((value) => {
          item.modify('discount', value);
          expect(item.discount).toStrictEqual(value);
        });
      });

      it(' - Method should correctly change price after discount', () => {
        const discount = 20;
        const expectedValue = 8;
        const expctedPriceAfterSecondDiscount: number = 6.4;

        expect(item.modify('discount', discount)).toStrictEqual(expectedValue);
        expect(item.modify('discount', discount)).toStrictEqual(expctedPriceAfterSecondDiscount);
      });

      it(' - Methoud Should correctly change item price based on quantity', () => {
        const quantity: number = 5;
        const expectedPrice = 50;
        item.changeItemPriceBasedOnQuantity('add', quantity);
        expect(item.quantity).toStrictEqual(quantity);
        expect(item.price).toStrictEqual(expectedPrice);
      });
    });
  });
});
