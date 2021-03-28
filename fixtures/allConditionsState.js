import recipes from './recipes';
import user from './user';

const allConditionsState = {
  user,
  recipe: recipes[0],
  recipes: { recipesBook: [...recipes] },
};

export default allConditionsState;
