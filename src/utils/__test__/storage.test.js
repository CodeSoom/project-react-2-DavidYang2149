import { saveItem, loadItem } from '../storage';

describe('storage', () => {
  jest.spyOn(window.sessionStorage.__proto__, 'setItem');

  beforeEach(() => {
    window.sessionStorage.__proto__.setItem = jest.fn();
    window.sessionStorage.__proto__.getItem = jest.fn();
  });

  describe('saveItem', () => {
    it('calls sessionStorage setItem', () => {
      saveItem('key', 'value');

      expect(sessionStorage.setItem).toBeCalledWith('key', 'value');
    });
  });

  describe('loadItem', () => {
    it('calls sessionStorage getItem', () => {
      loadItem('key');

      expect(sessionStorage.getItem).toBeCalledWith('key');
    });
  });
});
