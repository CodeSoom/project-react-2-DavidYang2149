import React from 'react';

import { render } from '@testing-library/react';

import Container from './Container';

describe('Container', () => {
  it('renders with children', () => {
    const { queryByText } = render((
      <Container>
        <p>Hello World</p>
      </Container>
    ));

    expect(queryByText('Hello World')).not.toBeNull();
  });
});
