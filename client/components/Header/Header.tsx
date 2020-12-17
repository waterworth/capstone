import Link from 'next/link';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import styles from './Header.module.scss';

const Header = (props: any) => {
  const { data } = useMeQuery();

  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>{props.title}</h1>
      {data?.me ? (
        <section className={styles.header__users}>
          <a className={styles.header__user}>
            <img src='https://via.placeholder.com/46' alt='userImage'></img>
          </a>
          <a className={styles.header__user}>
            <img src='https://via.placeholder.com/46' alt='userImage'></img>
          </a>
          <a className={styles.header__user}>
            <img src='https://via.placeholder.com/46' alt='userImage'></img>
          </a>
          <a className={styles.header__user}>
            <img src='https://via.placeholder.com/46' alt='userImage'></img>
          </a>
          <a className={styles.header__user}>
            <img src='https://via.placeholder.com/46' alt='userImage'></img>
          </a>
        </section>
      ) : (
        <section className={styles.header__links}>
          <Link href='/login'>
            <a className={styles.header__link}>Sign In</a>
          </Link>
          <Link href='/register'>
            <a className={styles.header__link}>Sign Up</a>
          </Link>
        </section>
      )}
    </header>
  );
};

export default Header;
