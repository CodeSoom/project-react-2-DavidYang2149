export const isEmpty = (value) => {
  if (!value) {
    return true;
  }
  return false;
};

export const isNotEmpty = (value) => {
  return !isEmpty(value);
};

export const isMatch = (left) => (right) => {
  if (left === right) {
    return true;
  }
  return false;
};

export const isNotMatch = (left) => (right) => {
  return !isMatch(left)(right);
};

export const isArray = (value) => {
  return Array.isArray(value);
};

export const isNotArray = (value) => {
  return !isArray(value);
};

export const changeDateToString = (date) => {
  if (isEmpty(date)) {
    return false;
  }
  return date.toDate().toISOString();
};

export const getFirstSplit = (value) => (keyword) => {
  return value.split(keyword)[0];
};

export const formatRecipe = (recipe) => {
  const { created, updated } = recipe.data();

  return {
    ...recipe.data(),
    id: recipe.id,
    created: changeDateToString(created),
    updated: changeDateToString(updated),
  };
};

export const RECIPE_COUNT = 12;
