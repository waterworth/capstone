import React from 'react';
import styled from 'styled-components';
//import { useMeQuery } from '../../generated/graphql';

const Wrapper = styled.header`
  padding: 4rem 3rem 1.5rem 0;
  position: sticky;
  top: 0;
  height: 8.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colours.cloud};
  background-color: ${(props) => props.theme.colours.white};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const UserImage = styled.img`
  margin-right: 0.375rem;
  &:last-child {
    margin-right: 0;
  }
`;

export const Header = (props: any) => {
  // const { data } = useMeQuery();

  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <section>
        <a>
          <UserImage
            src='https://via.placeholder.com/46'
            alt='userImage'></UserImage>
        </a>
        <a>
          <UserImage
            src='https://via.placeholder.com/46'
            alt='userImage'></UserImage>
        </a>
        <a>
          <UserImage
            src='https://via.placeholder.com/46'
            alt='userImage'></UserImage>
        </a>
        <a>
          <UserImage
            src='https://via.placeholder.com/46'
            alt='userImage'></UserImage>
        </a>
        <a>
          <UserImage
            src='https://via.placeholder.com/46'
            alt='userImage'></UserImage>
        </a>
      </section>
    </Wrapper>
  );
};
