'use client';
import moment from 'moment';
import Cookies from 'js-cookie';
import styles from '../page.module.scss';

import { ThreadInfo } from '../page';
import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import { UpvotedThreads } from '../../components/GeneralDiscussions';
import EditThreadModal from './EditThreadModal';
import Link from 'next/link';
import { HiOutlineArrowLongLeft } from 'react-icons/hi2';

interface Props {
  threadInfo: ThreadInfo;
  isOwner: boolean;
  allThreadsUpvotes: UpvotedThreads[];
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export default function ThreadHead({
  threadInfo,
  isOwner,
  allThreadsUpvotes,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const loggedUser = Cookies.get('userName');
  const router = useRouter();

  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const [countVotes, setCountVotes] = useState<number>(threadInfo.upvotes);
  const [userUpvotedThreads, setUserUpvotedMessages] = useState<
    UpvotedThreads[] | null
  >(allThreadsUpvotes);

  useEffect(() => {
    checkUserRole();
    checkUpvote();
  }, [loggedUser]);

  async function checkUserRole() {
    loggedUser === threadInfo.user.user_name
      ? setCanEdit(true)
      : setCanEdit(false);
    isOwner ? setCanDelete(true) : setCanDelete(false);
    if (isOwner && loggedUser === threadInfo.user.user_name) {
      setCanDelete(false);
    }
  }

  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);

  function checkUpvote() {
    const idToString: number = threadInfo.id;
    if (userUpvotedThreads) {
      for (const thread of userUpvotedThreads) {
        if (thread.thread_id === idToString) {
          setCountVotes(countVotes);
          setIsUpvoted(true);
        }
      }
    }
  }

  async function upvote() {
    await axios
      .post(
        `${isProduction}/projects/${threadInfo.project_id}/threads/${threadInfo.id}/upvotes/${loggedUser}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setIsUpvoted(true);
        setCountVotes(countVotes + 1);
        router.refresh();
      });
  }

  async function downvote() {
    await axios
      .delete(
        `${isProduction}/projects/${threadInfo.project_id}/threads/${threadInfo.id}/upvotes/${loggedUser}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setIsUpvoted(false);
        setCountVotes(countVotes - 1);
        router.refresh();
      });
  }

  function handleClick() {
    isUpvoted ? downvote() : upvote();
  }

  function handleEdit(): void {
    setShowModal(true);
  }

  async function handleDelete(): Promise<void> {
    await axios
      .delete(
        `${isProduction}/projects/${threadInfo.project_id}/threads/${threadInfo.id}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        router.push(`/project/${threadInfo.project_id}`);
      });
  }

  return (
    <div className={styles.threadBody}>
      <div className={styles.threadHeadContainer}>
      </div>
    </div>

  );
}
/*
    <div className={styles.threadContainer}>
      <div className={styles.threadContainerTop}>
        <div className={styles.threadHead}>
          <h1>{threadInfo.title}</h1>
          <div className={styles.userInfoContainer}>
            <h3>{threadInfo.user.user_name}</h3>
            <p>{moment(threadInfo.creation_time).fromNow()}</p>
          </div>
          <ReactMarkdown className={styles.threadContent}>
            {threadInfo.content}
          </ReactMarkdown>
          <div className={styles.lastContainer}>
            <div className={styles.upvotesContainer}>
              <button
                className={`${
                  isUpvoted ? styles.upvoteButtonAfter : styles.upvoteButton
                }`}
                onClick={handleClick}
              >
                {<HiOutlineArrowCircleUp />}
              </button>
              <h4>{countVotes}</h4>
            </div>

            <div className={styles.editThread}>
              {canEdit && (
                <div className={styles.messageIcons}>
                  <CiEdit className={styles.edit} onClick={handleEdit} />
                  <BsTrash className={styles.trash} onClick={handleDelete} />
                </div>
              )}
              {canDelete && (
                <div className={styles.messageIcons}>
                  <BsTrash className={styles.trash} onClick={handleDelete} />
                </div>
              )}
            </div>
          </div>
          <hr />
        </div>
        {showModal && (
          <EditThreadModal setShowModal={setShowModal} thread={threadInfo} />
        )}
      </div>
    </div>

*/
