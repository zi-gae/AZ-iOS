import React from 'react';
import styled from 'styled-components/native';
import Layout from '~/constants/Layout';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const Container = styled.View<StyleProps>`
  flex: 1;
  padding-left: ${`${Layout.width / 18}px`};
  padding-right: ${`${Layout.width / 18}px`};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'space-between'};
  margin-top: ${({ marginTop }) => marginTop ?? '0'};
  margin-bottom: ${({ marginBottom }) => marginBottom ?? '0'};
`;

interface StyleProps {
  marginTop?: string;
  marginBottom?: string;
  justifyContent?:
    | 'space-around'
    | 'space-between'
    | 'center'
    | 'flex-start'
    | 'flex-end';
}

interface SectionWrapperProps extends StyleProps {
  children: React.ReactElement | React.ReactElement[];
}

const SectionWrapper = ({
  children,
  marginBottom,
  marginTop,
  justifyContent,
}: SectionWrapperProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container
        marginBottom={marginBottom}
        marginTop={marginTop}
        justifyContent={justifyContent}>
        {children}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SectionWrapper;
