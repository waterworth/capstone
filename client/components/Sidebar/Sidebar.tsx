import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const apolloClient = useApolloClient();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <Link href='/'>
          <img src='https://via.placeholder.com/46' alt='teamlogo' />
        </Link>
        <div className={styles.sidebar__seperator}> </div>
        <img src='https://via.placeholder.com/46' alt='userImage' />
        <div className={styles.sidebar__headerinfo}>
          <h2 className={styles.sidebar__infoname}>Username</h2>
          <p className={styles.sidebar__inforole}>Administrator</p>
        </div>
      </div>
      <div className={styles.sidebar__nav}>
        <ul className={styles.sidebar__menu}>
          <li className={`${styles.sidebar__item} ${styles.active}`}>
            Dashboard
          </li>
          <li className={styles.sidebar__item}>Inbox</li>
          <li className={styles.sidebar__item}>Calendar</li>
          <li className={styles.sidebar__item}>Meetings</li>
        </ul>
      </div>
    </div>
  );
  // is logged in
};

export default Sidebar;
