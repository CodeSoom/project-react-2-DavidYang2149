import recipes from '../recipes';

test('recipes created Test', () => {
  expect(recipes[0].created.toDate().substr()).toBe(false);
  expect(recipes[1].created.toDate().substr()).toBe(false);

  expect(recipes[0].created.toISOString().substr()).toBe(false);
  expect(recipes[1].created.toISOString().substr()).toBe(false);
});
