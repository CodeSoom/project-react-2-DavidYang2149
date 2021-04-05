import React from 'react';
import { render } from '@testing-library/react';

import RecipeImageUpload from '../../recipe/RecipeImageUpload';

describe('RecipeImageUpload', () => {
  const renderRecipeImageUpload = ({
    upload = '', image = '', fileInputRef,
  }) => render((
    <RecipeImageUpload
      upload={upload}
      image={image}
      fileInputRef={fileInputRef}
      onFileChange={jest.fn()}
      onClearFile={jest.fn()}
      onRemoveFile={jest.fn()}
    />
  ));

  it('render values', () => {
    const { container } = renderRecipeImageUpload({});

    expect(container).toHaveTextContent('레시피 이미지');
  });

  context('with image', () => {
    it('render values', () => {
      const { container } = renderRecipeImageUpload({ image: 'images/cookie.jpeg' });

      expect(container).toHaveTextContent('이미지 삭제하기');
    });
  });

  context('without image', () => {
    it('not render image values', () => {
      const { container } = renderRecipeImageUpload({ image: '' });

      expect(container).not.toHaveTextContent('이미지 삭제하기');
    });
  });

  context('with upload', () => {
    it('render values', () => {
      const { container } = renderRecipeImageUpload({ upload: 'images/cookie.jpeg' });

      expect(container).toHaveTextContent('이미지 비우기');
    });
  });

  context('without upload', () => {
    it('not render upload values', () => {
      const { container } = renderRecipeImageUpload({ upload: '' });

      expect(container).not.toHaveTextContent('이미지 비우기');
    });
  });
});
