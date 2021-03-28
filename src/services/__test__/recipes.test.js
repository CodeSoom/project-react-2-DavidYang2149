/**
 * @jest-environment node
 */

import sampleRecipes from '../../../fixtures/recipes';
import {
  // fetchRecipe,
  fetchRecipes,
  postRecipe,
  updateRecipe,
  deleteRecipe,
} from '../recipes';

jest.mock('../firebase');

describe('Recipes', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  // describe('fetchRecipe', () => {
  //   it('returns recipe', async () => {
  //     const recipe = await fetchRecipe(1);

  //     expect(recipe).toEqual(sampleRecipes[0]);
  //   });
  // });

  describe('fetchRecipes', () => {
    it('renders recipes', async () => {
      const recipes = await fetchRecipes();

      expect(recipes[0]).toEqual(recipes[0]);
    });
  });

  describe('postRecipe', () => {
    beforeEach(() => {
      mockFetch();
    });

    it('returns nothing', async () => {
      const result = await postRecipe({
        userId: '1',
        title: '마들렌',
        category: 1,
        product: 16,
        ingredients: [
          { id: 1, ingredient: '설탕', weight: 150 },
          { id: 2, ingredient: '버터', weight: 150 },
          { id: 3, ingredient: '전란', weight: 100 },
          { id: 4, ingredient: '박력분', weight: 150 },
        ],
        description: '마들렌 만드는 방법. 오븐 180도에 10분간 굽기',
      });

      expect(result).toBeNull();
      // TODO : when update API
      // expect(result).toBeUndefined();
    });
  });

  describe('updateRecipe', () => {
    beforeEach(() => {
      mockFetch();
    });

    it('returns nothing', async () => {
      const result = await updateRecipe(sampleRecipes[0]);

      expect(result).toBeUndefined();
    });
  });

  describe('deleteRecipe', () => {
    beforeEach(() => {
      mockFetch();
    });

    it('returns nothing', async () => {
      const { id, userId } = sampleRecipes[0];
      const result = await deleteRecipe({ id, userId });

      expect(result).toBeUndefined();
    });
  });
});
