import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import RecipeTitle from '../components/RecipeTitle';
import RecipeImage from '../components/RecipeImage';
import RecipeBasicInfo from '../components/RecipeBasicInfo';
import RecipeDescription from '../components/RecipeDescription';
import IngredientList from '../components/IngredientList';
import UseLoading from '../components/UseLoading';
import { Button } from '../layouts/Recipe';
import { removeRecipe } from '../redux/recipe';
import { updateRecipes } from '../redux/recipes';
import {
  isMatch,
  isEmpty,
  isNotEmpty,
} from '../utils/utils';

const RecipeContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    user, recipe: {
      id, userId, title, category, product, ingredients, description, image,
    },
  } = useSelector((state) => ({
    user: state.user,
    recipe: state.recipe,
  }));

  const onRemove = async () => {
    const ensure = window.confirm('레시피를 삭제하시겠습니까?');
    if (isEmpty(ensure)) {
      return;
    }

    await dispatch(removeRecipe());
    await dispatch(updateRecipes());
    history.push('/');
  };

  if (isEmpty(id)) {
    return (
      <UseLoading />
    );
  }

  return (
    <article>
      <RecipeTitle title={title} />
      <RecipeImage image={image} />
      <RecipeBasicInfo
        title={title}
        category={category}
        product={product}
      />

      <IngredientList
        ingredients={ingredients}
      />

      <RecipeDescription
        description={description}
      />

      {
        isNotEmpty(userId) && isMatch(userId)(user.userId) && (
          <section>
            <Link to={`/recipewrite/${id}`}>
              <Button type="button">수정하기</Button>
            </Link>
            <Button
              type="button"
              onClick={onRemove}
            >
              삭제하기
            </Button>
          </section>
        )
      }
    </article>
  );
};

export default RecipeContainer;
