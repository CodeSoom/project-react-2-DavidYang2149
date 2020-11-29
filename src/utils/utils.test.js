import { get, equal } from './utils';

test('get', () => {
  const state = {
    name: '마들렌',
  };

  const f = get('name');
  const g = get('recipe');

  expect(f(state)).toBe('마들렌');
  expect(g(state)).toBeUndefined();
});

test('equal', () => {
  const state = {
    name: '마들렌',
  };

  const f = equal('name', '마들렌');
  const g = equal('name', '마카롱');

  expect(f(state)).toBeTruthy();
  expect(g(state)).toBeFalsy();
});
