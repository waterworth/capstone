import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  content: string;
  type?: 'button' | 'reset' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BaseButton = styled.button`
  color: white;
  background-color: ${(props) => props.theme.colours.lightblue};
  width: 15rem;
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  &:hover {
    background-color: ${(props) => props.theme.colours['lightblue-dark2']};
    transition: background-color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

const CenterButton = styled(BaseButton)`
  width: 80%;
  margin: 0 auto;
`;

const MeetingButton = styled(BaseButton)`
  height: 2.5rem;
  font-size: 1rem;
  padding: 0;
  width: 12rem;
`;

export const Button: React.FC<ButtonProps> = (props) => {
  return <BaseButton> {props.content}</BaseButton>;
};

// TODO figure out how to center button

export const CenteredButton: React.FC<ButtonProps> = (props) => {
  return <CenterButton> {props.content}</CenterButton>;
};

export const CreateMeetingButton: React.FC<ButtonProps> = (props) => {
  return <MeetingButton onClick={props.onClick}>{props.content}</MeetingButton>;
};
