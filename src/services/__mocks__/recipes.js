export async function fetchRecipe(id) {
  if (id === 0) {
    return false;
  }

  if (id === 2) {
    return Promise.resolve({
      data: jest.fn(),
      exists: false,
    });
  }

  return Promise.resolve({
    id: 0,
    data: () => {
      return {
        id: 0,
        userId: '',
        title: '',
        category: 0,
        product: 0,
        ingredients: [],
        newIngredient: { id: 0, ingredient: '', weight: 0 },
        description: '',
        upload: null,
        image: null,
      };
    },
    exists: true,
  });
}

export async function fetchRecipes() {
  return Promise.resolve([]);
}

export async function postRecipe() {
  return Promise.resolve('1');
}

export async function updateRecipe() {
  return Promise.resolve({});
}

export async function deleteRecipe() {
  return Promise.resolve({});
}
