'use client'

import styles from './UserContributions.module.scss';
import { useState } from 'react';
//import UserCodeContributions from './UserCodeContributions';
import UserDiscussionContributions from './UserDiscussionContributions';

interface Props {
  userMessages: Array<{
    content: string,
    creation_time: string,
    thread: {
      title: string
    }
  }>
}

export default function UserContributions({ userMessages }: Props) {
  const [selectedContributionView, setSelectedContributionView] =
    useState<string>('Code');

  return (
    <div>
      <div className={styles.userContributionsContainer}>
         {/* <span 
          onClick={() => setSelectedContributionView(() => 'Code')}
          className={
            selectedContributionView === 'Code'
              ? styles.selectedView
              : ''
          }
        >
          Code
        </span> */}
        <span
          onClick={() => setSelectedContributionView(() => 'Discussion')}
          className={
            selectedContributionView === 'Discussion'
              ? styles.selectedView
              : ''
          }
        > 
          Discussion
        </span>
        <UserDiscussionContributions 
            userMessages={userMessages}
          />
        {/* {
          selectedContributionView === 'Code' ?
          <UserCodeContributions /> :
          <UserDiscussionContributions 
            userMessages={userMessages}
          />
        } */}
      </div>
    </div>
  )
}