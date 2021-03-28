export const Droppable = ({ children }) => children({
  draggableProps: {
    style: {},
  },
  dragHandleProps: {
    style: {},
  },
  innerRef: jest.fn(),
}, {});

export const Draggable = ({ children }) => children({
  draggableProps: {
    style: {},
  },
  dragHandleProps: {
    style: {},
  },
  innerRef: jest.fn(),
}, {});

export const DragDropContext = ({ children }) => children;
