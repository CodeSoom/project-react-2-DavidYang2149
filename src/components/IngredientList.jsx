import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import IngredientItem from './IngredientItem';
import { Label } from '../layouts/Recipe';
import { isEmpty } from '../utils/utils';

const IngredientList = ({
  ingredients, onChangeIngredient, onRemoveIngredient, onDragEndIngredient,
}) => {
  if (isEmpty(onDragEndIngredient)) {
    return (
      <section>
        <ul>
          <li>
            <Label
              width="32%"
              display="inline-block"
            >
              원재료
            </Label>
            <Label
              width="20%"
              display="inline-block"
            >
              용량
            </Label>
          </li>
          {
            ingredients.map(({ id, ingredient, weight }) => {
              return (
                <IngredientItem
                  key={id}
                  id={id}
                  ingredient={ingredient}
                  weight={weight}
                  onChangeIngredient={onChangeIngredient}
                  onRemoveIngredient={onRemoveIngredient}
                />
              );
            })
          }
        </ul>
      </section>
    );
  }

  return (
    <section>
      <DragDropContext onDragEnd={onDragEndIngredient}>
        <Droppable droppableId="ingredients">
          {(droppableProvided) => (
            <ul
              className="ingredients"
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {
                ingredients.map(({ id, ingredient, weight }, index) => {
                  return (
                    <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
                      {(draggableProvided) => (
                        <IngredientItem
                          key={id}
                          id={id}
                          ingredient={ingredient}
                          weight={weight}
                          onChangeIngredient={onChangeIngredient}
                          onRemoveIngredient={onRemoveIngredient}
                          provided={draggableProvided}
                        />
                      )}
                    </Draggable>
                  );
                })
              }
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default IngredientList;
