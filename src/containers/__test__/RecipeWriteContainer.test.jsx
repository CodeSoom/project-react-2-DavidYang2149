import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import RecipeWriteContainer from '../RecipeWriteContainer';
import allConditionsState from '../../../fixtures/allConditionsState';
import recipes from '../../../fixtures/recipes';

const mockPush = jest.fn();

jest.mock('react-redux');
jest.mock('../../services/recipes');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('RecipeWriteContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      ...allConditionsState,
      recipe: recipes[0],
      user: {
        userId: '1',
        displayName: '',
      },
    }));
  });

  describe('initial sequence', () => {
    context('with write case(add)', () => {
      it('show recipe write', () => {
        useSelector.mockImplementation((selector) => selector({
          ...allConditionsState,
          recipe: {
            id: 0,
            userId: '',
            title: '',
            category: 0,
            product: 0,
            ingredients: [],
            newIngredient: { id: 0, ingredient: '', weight: 0 },
            description: '',
          },
          user: {
            userId: '1',
            displayName: '',
          },
        }));

        const { container } = render(<RecipeWriteContainer />);

        expect(container).toHaveTextContent('저장하기');
      });
    });

    context('with write case(update)', () => {
      it('show recipe write', () => {
        const { container } = render(<RecipeWriteContainer />);

        expect(container).toHaveTextContent('수정완료');
      });
    });

    context('with unauthorization', () => {
      it('refuse writing', () => {
        useSelector.mockImplementation((selector) => selector({
          ...allConditionsState,
          recipe: {
            id: 1,
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
            newIngredient: { id: 0, ingredient: '', weight: 0 },
            description: '마들렌 만드는 방법. 오븐 180도에 10분간 굽기',
          },
          user: {
            userId: '2',
            displayName: '',
          },
        }));

        const { container } = render(<RecipeWriteContainer />);

        expect(container).toHaveTextContent('없음');
      });
    });
  });

  describe('with recipe', () => {
    it('renders container', () => {
      render(<RecipeWriteContainer />);
    });

    it('change recipe', () => {
      const { getByLabelText } = render(<RecipeWriteContainer />);

      const label = getByLabelText('레시피명');
      expect(label.value).toBe('마들렌');

      fireEvent.change(label, {
        target: {
          name: 'title',
          value: '파운드케이크',
        },
      });

      expect(dispatch).toBeCalledWith({
        type: 'recipe/changeRecipe',
        payload: { name: 'title', value: '파운드케이크' },
      });
    });

    it('change ingredient', () => {
      const { getByDisplayValue } = render(<RecipeWriteContainer />);

      const input = getByDisplayValue('설탕');
      expect(input.value).toBe('설탕');

      fireEvent.change(input, {
        target: {
          name: 'ingredient-1',
          value: '백설탕',
        },
      });

      expect(dispatch).toBeCalledWith({
        type: 'recipe/changeIngredient',
        payload: { name: 'ingredient-1', value: '백설탕' },
      });
    });

    it('change new ingredient', () => {
      const { getByLabelText } = render(<RecipeWriteContainer />);

      const label = getByLabelText('원재료');
      expect(label.value).toBe('');

      fireEvent.change(label, {
        target: {
          name: 'ingredient-5',
          value: '레몬',
        },
      });

      expect(dispatch).toBeCalledWith({
        type: 'recipe/changeNewIngredient',
        payload: { name: 'ingredient-5', value: '레몬' },
      });
    });

    context('keyup with enter', () => {
      it('set new ingredient', () => {
        useSelector.mockImplementation((selector) => selector({
          ...allConditionsState,
          recipe: {
            ...recipes[0],
            newIngredient: { id: 0, ingredient: '바닐라빈', weight: 10 },
          },
          user: {
            userId: '1',
            displayName: '',
          },
        }));
        const { getByLabelText } = render(<RecipeWriteContainer />);

        const label = getByLabelText('원재료');

        fireEvent.keyUp(label, {
          key: 'Enter',
        });

        expect(dispatch).toBeCalledWith({
          type: 'recipe/setNewIngredient',
          payload: {
            fields: {
              id: 0,
              ingredient: '바닐라빈',
              weight: 10,
            },
          },
        });
      });
    });

    context('keyup without enter', () => {
      it('nothing to change', () => {
        const { getByLabelText } = render(<RecipeWriteContainer />);

        const label = getByLabelText('원재료');
        expect(label.value).toBe('');

        fireEvent.keyUp(label, {
          key: 'Shift',
        });

        expect(dispatch).toBeCalledTimes(0);
      });
    });

    context('with new ingredient values', () => {
      it('click and set new ingredient', () => {
        useSelector.mockImplementation((selector) => selector({
          ...allConditionsState,
          recipe: {
            ...recipes[0],
            newIngredient: { id: 0, ingredient: '바닐라빈', weight: 10 },
          },
          user: {
            userId: '1',
            displayName: '',
          },
        }));

        const { getByText } = render(<RecipeWriteContainer />);

        fireEvent.click(getByText('추가하기'));

        expect(dispatch).toBeCalledWith({
          type: 'recipe/setNewIngredient',
          payload: {
            fields: {
              id: 0,
              ingredient: '바닐라빈',
              weight: 10,
            },
          },
        });
      });
    });

    context('without new ingredient values', () => {
      it('click and not to change', () => {
        const { getByText } = render(<RecipeWriteContainer />);

        fireEvent.click(getByText('추가하기'));

        expect(dispatch).not.toBeCalledWith({
          type: 'recipe/setNewIngredient',
          payload: {
            fields: {
              id: 0,
              ingredient: '',
              weight: 0,
            },
          },
        });
      });
    });

    context('with new recipe', () => {
      it('click onSubmit', () => {
        useSelector.mockImplementation((selector) => selector({
          ...allConditionsState,
          recipe: {
            id: 0,
            userId: '',
            title: '마들렌',
            category: 1,
            product: 16,
            ingredients: [
              { id: 1, ingredient: '설탕', weight: 150 },
              { id: 2, ingredient: '버터', weight: 150 },
              { id: 3, ingredient: '전란', weight: 100 },
              { id: 4, ingredient: '박력분', weight: 150 },
            ],
            newIngredient: { id: 0, ingredient: '', weight: 0 },
            description: '마들렌 만드는 방법. 오븐 180도에 10분간 굽기',
          },
          user: {
            userId: '1',
            displayName: '',
          },
        }));
        const { getByText } = render(<RecipeWriteContainer />);

        fireEvent.click(getByText('저장하기'));

        expect(dispatch).toBeCalledTimes(1);
      });
    });

    context('with exist recipe', () => {
      useSelector.mockImplementation((selector) => selector({
        ...allConditionsState,
        recipe: recipes[0],
        user: {
          userId: '1',
          displayName: '',
        },
      }));

      it('click onSubmit', () => {
        const { getByText } = render(<RecipeWriteContainer />);

        fireEvent.click(getByText('수정완료'));

        expect(dispatch).toBeCalledTimes(1);
      });
    });

    context('with confirm true', () => {
      it('click onRemove', () => {
        global.confirm = () => true;
        const { getByText } = render(<RecipeWriteContainer />);

        fireEvent.click(getByText('삭제하기'));

        expect(dispatch).toBeCalledTimes(1);
      });
    });

    context('with confirm false', () => {
      it('click onRemove', () => {
        global.confirm = () => false;
        const { getByText } = render(<RecipeWriteContainer />);

        fireEvent.click(getByText('삭제하기'));

        expect(dispatch).toBeCalledTimes(0);
      });
    });

    it('click onRemoveIngredient', () => {
      const { getAllByText } = render(<RecipeWriteContainer />);

      fireEvent.click(getAllByText('삭제')[0]);

      expect(dispatch).toBeCalledTimes(1);
    });

    it('change file', () => {
      const { getByLabelText } = render(<RecipeWriteContainer />);

      global.FileReader = jest.fn(() => {
        return {
          readAsDataURL: jest.fn(),
          onloadend: jest.fn(),
        };
      });
      const label = getByLabelText('레시피 이미지');
      expect(label.value).toBe('');

      fireEvent.change(label, {
        target: {
          files: 'cookie.jpeg',
        },
      });

      // TODO: onFileChange
      expect(dispatch).toBeCalledTimes(0);
      // expect(dispatch).toBeCalledWith({
      //   type: 'recipe/changeRecipe',
      //   payload: { name: 'upload', value: 'cookie.jpeg' },
      // });
    });

    it('mouse drag onDragEndIngredient', async () => {
      // TODO: swapIngredients TEST
      const { getAllByText } = render(<RecipeWriteContainer />);

      fireEvent.mouseDown(getAllByText('g')[2]);
      fireEvent.mouseMove(getAllByText('g')[2], {
        clientX: 40,
        clientY: 40,
      });
      fireEvent.mouseUp(getAllByText('g')[2]);

      // expect(dispatch).toBeCalledWith({
      //   type: 'recipe/swapIngredients',
      //   payload: {
      //     fields: {
      //       id: 0,
      //       ingredient: '',
      //       weight: 0,
      //     },
      //   },
      // });

      // await expect(getAllByText('g')[1]).toBeCalledWith();
      // await expect(dispatch).toBeCalledWith();
      expect(dispatch).toBeCalledTimes(0);
    });
  });
});
