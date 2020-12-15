import React from 'react';
import styles from './Subnav.module.scss';

interface SubnavProps {}

export const Subnav: React.FC<SubnavProps> = ({}) => {
  return (
    <nav className={styles.subnav}>
      <ul className={styles.subnav__menu}>
        <li className={` ${styles.subnav__menuitem} ${styles.active} `}>
          Schedule
        </li>
        <li className={styles.subnav__menuitem}>Inbox</li>
        <li className={styles.subnav__menuitem}>Meetings</li>
      </ul>

      <button className={styles.button__new}>Create New Meeting</button>
    </nav>
  );
};
