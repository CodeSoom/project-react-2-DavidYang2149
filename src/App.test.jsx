import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders the home page', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent('Oh My Baking Recipe');
  });

  context('when recipe view page', () => {
    it('renders with recipe information', () => {
      const { container } = render((
        <App />
      ));

      expect(container).toHaveTextContent('레시피명');
      expect(container).toHaveTextContent('카테고리');
      expect(container).toHaveTextContent('생산량');

      expect(container).toHaveTextContent('오븐 온도');
      expect(container).toHaveTextContent('굽는 시간');

      expect(container).toHaveTextContent('재료');
      expect(container).toHaveTextContent('만드는 방법');
    });
  });
});
