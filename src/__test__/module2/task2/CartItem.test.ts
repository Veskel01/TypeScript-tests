import CartItem from '../../../tasks/module2/task2/CartItem';
import * as uuid from 'uuid';

jest.mock('uuid');

describe('CartItem test', () => {
  describe('When invalid arguments provided', () => {
    it('test', () => {
      const spy = jest.spyOn(uuid, 'v4').mockImplementation(() => '123');

      console.log(uuid.v4());
    });
  });
});
