import Link from 'next/link';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';

export const Header = (props: any) => {
  const { data } = useMeQuery();

  return (
    <header>
      <h1>{props.title}</h1>
      {data?.me ? (
        <section>
          <a>
            <img src='https://via.placeholder.com/46' alt='userImage'></img>
          </a>
          <a>
            <img src='https://via.placeholder.com/46' alt='userImage'></img>
          </a>
          <a>
            <img src='https://via.placeholder.com/46' alt='userImage'></img>
          </a>
          <a>
            <img src='https://via.placeholder.com/46' alt='userImage'></img>
          </a>
          <a>
            <img src='https://via.placeholder.com/46' alt='userImage'></img>
          </a>
        </section>
      ) : (
        <section>
          <Link href='/login'>
            <a>Sign In</a>
          </Link>
          <Link href='/register'>
            <a>Sign Up</a>
          </Link>
        </section>
      )}
    </header>
  );
};

// .header {
//   padding: 4rem 3rem 1.5rem 3rem;
//   position: sticky;
//   top: 0;
//   width: 100%;
//   height: 8.5rem;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   border-bottom: 1px solid $cloud;
//   background-color: $white;
//   &__title {
//     margin: 0;
//     font-size: 2rem;
//   }
//   &__user {
//     margin-right: 0.375rem;
//     &:last-child {
//       margin-right: 0;
//     }
//   }
//   &__link {
//     color: $black;
//     margin-left: 2rem;
//     &:hover {
//       color: $lightblue-dark2;
//       transition: color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
//     }
//   }
// }
