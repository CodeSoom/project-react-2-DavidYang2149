import React from 'react';

import {
  Label, Input, Img, Button,
} from '../layouts/Recipe';
import { isNotEmpty } from '../utils/utils';

const RecipeImageUpload = ({
  upload, image, fileInputRef, onFileChange, onClearFile, onRemoveFile,
}) => {
  return (
    <section>
      {
        isNotEmpty(image) && (
          <div>
            <Label
              htmlFor="displayImage"
              display="block"
            >
              이미지
            </Label>
            <Img id="displayImage" src={image} width="200px" height="200px" alt="displayImage" />
            <div>
              <Button
                type="button"
                onClick={onRemoveFile}
              >
                이미지 삭제하기
              </Button>
            </div>
          </div>
        )
      }
      <div>
        <Label
          htmlFor="image"
          display="block"
        >
          레시피 이미지
        </Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInputRef}
        />
        {
          isNotEmpty(upload) && (
            <>
              <div>
                <Img src={upload} width="200px" height="200px" alt="preview" />
              </div>
              <div>
                <Button
                  type="button"
                  onClick={onClearFile}
                >
                  이미지 비우기
                </Button>
              </div>
            </>
          )
        }
      </div>
    </section>
  );
};

export default RecipeImageUpload;
