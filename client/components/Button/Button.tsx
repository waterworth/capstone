import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  content: string;
}

const StyledButton = styled.button`
  color: white;
  background-color: ${(props) => props.theme.colours.lightblue};
  margin: 1rem 2.5rem;
  width: 15rem;
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  color: $cloud;
  &:hover {
    background-color: ${(props) => props.theme.colours['lightblue-dark2']};
    transition: background-color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

export const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton> {props.content}</StyledButton>;
};
