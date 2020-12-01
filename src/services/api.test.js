import {
  fetchRecipe,
  fetchCategories,
} from './api';

import RECIPE from '../../fixtures/recipe';
import CATEGORIES from '../../fixtures/categories';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('fetchRecipe', () => {
    beforeEach(() => {
      mockFetch(RECIPE);
    });

    it('returns regions', async () => {
      const recipe = await fetchRecipe();

      expect(recipe).toEqual(RECIPE);
    });
  });

  describe('fetchCategories', () => {
    beforeEach(() => {
      mockFetch(CATEGORIES);
    });

    it('returns regions', async () => {
      const categories = await fetchCategories();

      expect(categories).toEqual(CATEGORIES);
    });
  });
});
