import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>Dashboard</h1>
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
    </header>
  );
};

export default Header;
