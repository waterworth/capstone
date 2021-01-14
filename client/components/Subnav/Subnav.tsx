import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { CreateMeetingButton } from '../Button/Button';

interface SubnavProps {
  options: string[];
}

const Wrapper = styled.nav`
  position: sticky;
  top: 136px;
  width: 100%;
  padding-right: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid ${(props) => props.theme.colours.cloud};
`;

const Menu = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
`;

const MenuItem = styled.li`
  padding: 1.5rem 0 1.5rem 0;
  margin: 0 2rem 0 0;
  font-size: 1.25rem;
`;

export const Subnav: React.FC<SubnavProps> = (props) => {
  return (
    <Wrapper>
      <Menu>
        {props.options.map((option) => (
          <MenuItem key={option}>{option}</MenuItem>
        ))}
      </Menu>

      <Link href='/create-meeting'>
        <CreateMeetingButton content='Create New Meeting' />
      </Link>
    </Wrapper>
  );
};

//TODO add active class on menu items
// .active {
//   color: $lightblue-dark2;
//   font-weight: 600;
//   border-bottom: 0.4rem solid $lightblue-dark2;
// }
