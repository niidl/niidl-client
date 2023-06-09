'use client';
import Cookies from 'js-cookie';
import moment from 'moment';
import styles from './ThreadMessage.module.scss';
import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UpvotedMessages } from '../page';
import Markdown from 'markdown-to-jsx';
import EditMessageModal from './EditMessageModal';
import { CodeBlock, CodeSpaces } from './ThreadMessageCode';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';

interface Props {
  content: string;
  creation_time: Date;
  username: string;
  projectOwner: string;
  projectId: number;
  threadId: number;
  messageId: number;
  upvotes_messages: number;
  allUpvotes: UpvotedMessages[];
  isOwner: boolean;
  githubPhoto: string;
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export default function ThreadMessage({
  content,
  creation_time,
  username,
  projectId,
  threadId,
  messageId,
  upvotes_messages,
  allUpvotes,
  isOwner,
  githubPhoto,
}: Props) {
  const loggedUser = Cookies.get('userName');
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userUpvotedMessages, setUserUpvotedMessages] = useState<
    UpvotedMessages[] | null
  >(allUpvotes);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const [countVotes, setCountVotes] = useState<number>(upvotes_messages);

  useEffect(() => {
    checkUserRole();
    checkUpvote();
  }, [loggedUser]);

  async function checkUserRole() {
    loggedUser === username ? setCanEdit(true) : setCanEdit(false);
    isOwner ? setCanDelete(true) : setCanDelete(false);
    if (isOwner && loggedUser === username) {
      setCanDelete(false);
    }
  }

  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);

  function checkUpvote() {
    const idToString: number = messageId;
    if (userUpvotedMessages) {
      for (const message of userUpvotedMessages) {
        if (message.message_id === idToString) {
          setIsUpvoted(true);
        }
      }
    }
  }

  async function upvote() {
    await axios
      .post(
        `${isProduction}/projects/${projectId}/threads/${threadId}/messages/${messageId}/upvotes/${loggedUser}`,
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
    await fetch(
      `${isProduction}/projects/${threadId}/threads/${threadId}/messages/${messageId}/upvotes/${loggedUser}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
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
        `${isProduction}/projects/${projectId}/threads/${threadId}/messages/${messageId}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        router.refresh();
      });
  }

  return (
    <div className={styles.threadMessageBody}>
      <div className={styles.threadMessageContainer}>
        <div className={styles.threadMessageMid}>
          {
            <Markdown
              options={{
                disableParsingRawHTML: true,
                overrides: {
                  code: { component: CodeBlock },
                  span: { component: CodeSpaces },
                },
              }}
            >
              {content}
            </Markdown>
          }
        </div>
        <div className={styles.threadMessageBot}>
          <div className={styles.threadMessageBotLeft}>
            <img src={githubPhoto} alt=""></img>
            <div className={styles.postInfoContainer}>
              <h3>
                {' '}
                posted by <span>{username}</span>
              </h3>
              <p>{moment(creation_time).fromNow()}</p>
            </div>
          </div>
          <div className={styles.threadMessageBotRight}>
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
        <EditMessageModal
          setShowModal={setShowModal}
          projectId={projectId}
          threadId={threadId}
          messageId={messageId}
          content={content}
        />
      )}
    </div>
  );
}
