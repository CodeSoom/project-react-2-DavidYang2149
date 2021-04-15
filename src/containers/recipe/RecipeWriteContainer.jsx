import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import RecipeTitle from '../../components/recipe/RecipeTitle';
import RecipeBasicInfo from '../../components/recipe/RecipeBasicInfo';
import RecipeDescription from '../../components/recipe/RecipeDescription';
import RecipeImageUpload from '../../components/recipe/RecipeImageUpload';
import IngredientList from '../../components/recipe/IngredientList';
import IngredientAdd from '../../components/recipe/IngredientAdd';
import RecipeNotFound from '../../components/recipe/RecipeNotFound';
import Loading from '../../components/common/Loading';
import { Button } from '../../layouts/Recipe';
import {
  setNewIngredient,
  changeRecipe,
  changeIngredient,
  changeNewIngredient,
  removeIngredient,
  swapIngredients,
  writeRecipe,
  removeRecipe,
  removeFile,
} from '../../redux/recipe';
import { updateRecipes } from '../../redux/recipes';
import {
  isMatch,
  isEmpty,
  isNotEmpty,
} from '../../utils/utils';

const RecipeWriteContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();
  const NewIngredientRef = useRef();

  const {
    user, recipe: {
      id, userId, title, category, product, ingredients, newIngredient, description, upload, image,
    },
  } = useSelector((state) => ({
    user: state.user,
    recipe: state.recipe,
  }));

  const onChangeRecipe = useCallback((event) => {
    const { name, value } = event.target;
    dispatch(changeRecipe({ name, value }));
  }, [dispatch]);

  const onChangeIngredient = useCallback((event) => {
    const { name, value } = event.target;
    dispatch(changeIngredient({ name, value }));
  }, [dispatch]);

  const onChangeNewIngredient = useCallback((event) => {
    const { name, value } = event.target;
    dispatch(changeNewIngredient({ name, value }));
  }, [dispatch]);

  const onRemoveIngredient = useCallback((event) => {
    const { value } = event.target;
    dispatch(removeIngredient({ value }));
  }, [dispatch]);

  const onKeyUpSetNewIngredient = useCallback((event) => {
    if (isEmpty(newIngredient.ingredient)) {
      return;
    }

    if (isEmpty(newIngredient.weight)) {
      return;
    }

    if (isMatch(event.key)('Enter')) {
      dispatch(setNewIngredient({ fields: newIngredient }));
      NewIngredientRef.current.focus();
    }
  }, [dispatch, newIngredient]);

  const onClickSetNewIngredient = useCallback(() => {
    dispatch(setNewIngredient({ fields: newIngredient }));
    NewIngredientRef.current.focus();
  }, [dispatch, newIngredient]);

  const onDragEndIngredient = useCallback((result) => {
    const originIndex = result.source.index || 0;
    const destinationIndex = result.destination.index || 0;

    dispatch(swapIngredients({ originIndex, destinationIndex }));
  }, [dispatch]);

  const onSubmit = useCallback(async () => {
    if (isEmpty(title.trim())) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (isEmpty(category)) {
      alert('카테고리를 입력해주세요.');
      return;
    }

    if (isEmpty(product)) {
      alert('생산량을 입력해주세요.');
      return;
    }

    if (isEmpty(description.trim())) {
      alert('만드는 방법을 입력해주세요.');
      return;
    }

    setLoading(true);
    await dispatch(writeRecipe());
    await dispatch(updateRecipes());

    if (isEmpty(id)) {
      history.push('/');
      return;
    }

    history.push(`/recipe/${id}`);
  }, [dispatch, title, category, product, description, id]);

  const onRemove = useCallback(async () => {
    const ensure = window.confirm('레시피를 삭제하시겠습니까?');
    if (isEmpty(ensure)) {
      return;
    }

    setLoading(true);
    await dispatch(removeFile());
    await dispatch(removeRecipe());
    await dispatch(updateRecipes());

    history.push('/');
  }, [dispatch]);

  const onFileChange = useCallback((event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const limit3MB = 3 * 1024 * 1024;

    if (isEmpty(theFile) || theFile.size > limit3MB) {
      alert('3MB 이하의 이미지만 업로드 가능합니다.');
      fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent;
      dispatch(changeRecipe({ name: 'upload', value: result }));
    };
    reader.readAsDataURL(theFile);
  }, [dispatch]);

  const onClearFile = useCallback(() => {
    dispatch(changeRecipe({ name: 'upload', value: null }));
    fileInputRef.current.value = '';
  }, [dispatch]);

  const onRemoveFile = useCallback(async () => {
    setLoading(true);
    await dispatch(removeFile());
    await dispatch(writeRecipe());
    await dispatch(updateRecipes());

    setLoading(false);
    fileInputRef.current.value = '';
  }, [dispatch]);

  const isNotWriteAdd = useCallback((userUserId) => (recipeId) => (recipeUserId) => {
    if (isNotEmpty(userUserId) && isEmpty(recipeId) && isEmpty(recipeUserId)) {
      return false;
    }
    return true;
  }, []);

  const isNotWriteUpdate = useCallback((userUserId) => (recipeId) => (recipeUserId) => {
    if (isNotEmpty(userUserId) && isNotEmpty(recipeId) && isMatch(userUserId)(recipeUserId)) {
      return false;
    }
    return true;
  }, []);

  if (isNotWriteAdd(user.userId)(id)(userId)
    && isNotWriteUpdate(user.userId)(id)(userId)) {
    return (
      <RecipeNotFound />
    );
  }

  return (
    <article>
      <RecipeTitle title={isEmpty(userId) ? '레시피 제작' : `${title} 편집`} />
      <RecipeBasicInfo
        title={title}
        category={category}
        product={product}
        onChangeRecipe={onChangeRecipe}
      />

      <IngredientAdd
        newId={ingredients.length + 1}
        newIngredient={newIngredient}
        NewIngredientRef={NewIngredientRef}
        onChangeNewIngredient={onChangeNewIngredient}
        onKeyUpSetNewIngredient={onKeyUpSetNewIngredient}
        onClickSetNewIngredient={onClickSetNewIngredient}
      />

      <IngredientList
        ingredients={ingredients}
        onChangeIngredient={onChangeIngredient}
        onRemoveIngredient={onRemoveIngredient}
        onDragEndIngredient={onDragEndIngredient}
      />

      <RecipeDescription
        description={description}
        onChangeRecipe={onChangeRecipe}
      />

      <RecipeImageUpload
        upload={upload}
        image={image}
        fileInputRef={fileInputRef}
        onFileChange={onFileChange}
        onClearFile={onClearFile}
        onRemoveFile={onRemoveFile}
      />

      <section>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={
            loading
            || isEmpty(title.trim())
            || isEmpty(category)
            || isEmpty(product)
            || isEmpty(description.trim())
          }
        >
          {isEmpty(userId) ? '저장하기' : '수정완료'}
        </Button>
        {
          isNotEmpty(userId) && (
            <Button
              type="button"
              onClick={onRemove}
              disabled={loading}
            >
              삭제하기
            </Button>
          )
        }
      </section>
      {loading && <Loading />}
    </article>
  );
};

export default RecipeWriteContainer;
