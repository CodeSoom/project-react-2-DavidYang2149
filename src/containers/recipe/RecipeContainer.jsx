import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import RecipeTitle from '../../components/recipe/RecipeTitle';
import RecipeUser from '../../components/recipe/RecipeUser';
import RecipeImage from '../../components/recipe/RecipeImage';
import RecipeBasicInfo from '../../components/recipe/RecipeBasicInfo';
import RecipeDescription from '../../components/recipe/RecipeDescription';
import IngredientList from '../../components/recipe/IngredientList';
import Loading from '../../components/common/Loading';
import { Button } from '../../layouts/Recipe';
import { removeRecipe } from '../../redux/recipe';
import { updateRecipes } from '../../redux/recipes';
import {
  isMatch,
  isEmpty,
  isNotEmpty,
} from '../../utils/utils';

const RecipeContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const {
    user, recipe: {
      id, userId, title, category, product, ingredients, description, image, created,
    },
  } = useSelector((state) => ({
    user: state.user,
    recipe: state.recipe,
  }));

  const onRemove = useCallback(async () => {
    const ensure = window.confirm('레시피를 삭제하시겠습니까?');
    if (isEmpty(ensure)) {
      return;
    }

    setLoading(true);
    await dispatch(removeRecipe());
    await dispatch(updateRecipes());
    history.push('/');
  }, [dispatch]);

  if (isEmpty(id)) {
    return (
      <Loading />
    );
  }

  return (
    <article>
      <RecipeTitle title={title} />
      <RecipeUser user={userId} created={created} />
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
              disabled={loading}
            >
              삭제하기
            </Button>
          </section>
        )
      }
      {loading && <Loading />}
    </article>
  );
};

export default RecipeContainer;
