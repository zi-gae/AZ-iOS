import React from 'react';
import styled from 'styled-components/native';

import { MarginStyleProps } from '@types';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { marginStyles } from '~/styles/mixin';

const Image = styled.Image<StyleProps>`
  ${marginStyles};
  width: ${({ imgWidth }) => imgWidth ?? '100%'};
  height: ${({ imgHeight }) => imgHeight ?? '100%'};
`;
const AutoImage = styled.Image<StyleProps>`
  ${marginStyles};
`;

interface StyleProps extends MarginStyleProps {
  imgWidth?: string;
  imgHeight?: string;
}
interface ImageProps extends StyleProps {
  imgSrc: ImageSourcePropType;
  onPress?: () => void;
  width?: string;
  height?: string;
}

const ImageViewer = ({
  imgSrc,
  marginLeft,
  marginTop,
  marginBottom,
  marginRight,
  onPress,
  width,
  height,
}: ImageProps) => {
  const ImgType = width ? (
    <Image
      resizeMode="contain"
      source={imgSrc}
      marginLeft={marginLeft}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginRight={marginRight}
      imgWidth={width}
      imgHeight={height}
    />
  ) : (
    <AutoImage
      resizeMode="contain"
      source={imgSrc}
      marginLeft={marginLeft}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginRight={marginRight}
    />
  );
  return onPress ? (
    <TouchableOpacity onPress={onPress}>{ImgType}</TouchableOpacity>
  ) : (
    ImgType
  );
};

export default ImageViewer;
