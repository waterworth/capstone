import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import React, { useState } from 'react';
import { useMeQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../util/createUrqlClient';
import { isServer } from '../../util/isServer';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const { data, loading } = useMeQuery({});

  let body = null;

  //loading
  if (loading) {
    // not logged in
  } else if (!data?.me) {
    body = (
      <div className={styles.sidebar}>
        <div className={styles.sidebar__header}>
          <Link href='/'>
            <img src='https://via.placeholder.com/46' alt='teamlogo' />
          </Link>
          <div className={styles.sidebar__seperator}> </div>
          <img src='https://via.placeholder.com/46' alt='userImage' />
          <div className={styles.sidebar__headerinfo}>
            <h2 className={styles.sidebar__infoname}>{data?.me?.username}</h2>
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
  } else {
    body = (
      <div className={styles.sidebar}>
        <div className={styles.sidebar__header}>
          <img src='https://via.placeholder.com/46' alt='teamlogo' />
          <div className={styles.sidebar__seperator}> </div>
          <img src='https://via.placeholder.com/46' alt='userImage' />
          <div className={styles.sidebar__headerinfo}>
            <h2 className={styles.sidebar__infoname}>{data.me.username}</h2>
            <p className={styles.sidebar__inforole}>
              {data.me.isAdmin ? 'Administrator' : null}
            </p>
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
  }

  return <>{body}</>;
};

export default Sidebar;
