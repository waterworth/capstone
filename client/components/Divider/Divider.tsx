import React from 'react';
import styled from 'styled-components';

interface DividerProps {}

const Line = styled.div`
  background-color: ${(props) => props.theme.colours['grey-light1']};
  height: 1px;
  width: 100%;
`;

export const Divider: React.FC<DividerProps> = ({}) => {
  return <Line />;
};
