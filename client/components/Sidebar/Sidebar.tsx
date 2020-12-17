import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const { data, loading } = useMeQuery({});
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
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
            <p className={styles.sidebar__inforole}>
              {data?.me?.isAdmin ? 'Administrator' : null}
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
    // is logged in
  } else {
    body = (
      <div className={styles.sidebar}>
        <div className={styles.sidebar__header}>
          <Link href='/'>
            <img src='https://via.placeholder.com/46' alt='teamlogo' />
          </Link>
          <div className={styles.sidebar__seperator}> </div>
          <img src='https://via.placeholder.com/46' alt='userImage' />
          <div className={styles.sidebar__headerinfo}>
            <h2 className={styles.sidebar__infoname}>{data.me.username}</h2>
            <p className={styles.sidebar__inforole}>
              {data.me.isAdmin === false ? null : 'Administrator'}
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
        <div>
          <button
            className={styles.sidebar__logout}
            onClick={async () => {
              await logout();
              await apolloClient.resetStore();
            }}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return <>{body}</>;
};

export default Sidebar;
