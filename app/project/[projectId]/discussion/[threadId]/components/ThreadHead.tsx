'use client';
import moment from 'moment';
import Cookies from 'js-cookie';
import styles from './ThreadHead.module.scss';
import { ThreadInfo } from '../page';
import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';
import { UpvotedThreads } from '../../components/GeneralDiscussions';
import EditThreadModal from './EditThreadModal';
import Markdown from 'markdown-to-jsx';
import { CodeBlock } from './ThreadMessageCode';

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
  const [countVotes, setCountVotes] = useState<number>(
    threadInfo.upvotes_threads
  );
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
    if (userUpvotedThreads) {
      for (const thread of userUpvotedThreads) {
        if (thread.thread_id === threadInfo.id) {
          setCountVotes(countVotes);
          setIsUpvoted(true);
        }
      }
    }
  }

  async function upvote(e: any) {
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

  async function downvote(e: any) {
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

  function handleClick(e: any) {
    isUpvoted ? downvote(e) : upvote(e);
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
    <div className={styles.threadHeadBody}>
      <div className={styles.threadHeadContainer}>
        <div className={styles.threadHeadTop}>
          <h1>{threadInfo.title}</h1>
        </div>
        <div className={styles.threadHeadMid}>
          {
            <Markdown
              options={{
                overrides: {
                  code: { component: CodeBlock },
                },
              }}
            >
              {threadInfo.content}
            </Markdown>
          }
        </div>
        <div className={styles.threadHeadBot}>
          <div className={styles.threadHeadBotLeft}>
            <img src={threadInfo.user.github_profile_picture} alt=""></img>
            <div className={styles.postInfoContainer}>
              <h3>
                {' '}
                posted by <span>{threadInfo.user.user_name}</span>
              </h3>
              <p>{moment(threadInfo.creation_time).fromNow()}</p>
            </div>
          </div>
          <div className={styles.threadHeadBotRight}>
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
            <button
              className={`${
                isUpvoted ? styles.upvoteButtonAfter : styles.upvoteButton
              }`}
              onClick={handleClick}
            >
              {<HiOutlineArrowCircleUp className={styles.icon} />}
            </button>
            <p>{countVotes}</p>
          </div>
        </div>
      </div>
      {showModal && (
        <EditThreadModal setShowModal={setShowModal} thread={threadInfo} />
      )}
    </div>
  );
}
