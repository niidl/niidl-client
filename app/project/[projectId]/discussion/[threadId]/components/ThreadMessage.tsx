'use client';
import Cookies from 'js-cookie';
import moment from 'moment';
import styles from '../page.module.scss';
import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BiUpvote } from 'react-icons/bi';
import { UpvotedMessages } from '../page';
import ReactMarkdown from 'react-markdown';
import EditMessageModal from './EditMessageModal';

interface Props {
  content: string;
  creation_time: Date;
  username: string;
  projectOwner: string;
  projectId: number;
  threadId: number;
  messageId: number;
  upvotes: number;
  allUpvotes: UpvotedMessages[];
  isOwner: boolean;
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export default function ThreadMessage({
  content,
  creation_time,
  username,
  projectOwner,
  projectId,
  threadId,
  messageId,
  upvotes,
  allUpvotes,
  isOwner,
}: Props) {
  const loggedUser = Cookies.get('userName');
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userUpvotedMessages, setUserUpvotedMessages] = useState<
    UpvotedMessages[] | null
  >(allUpvotes);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const [countVotes, setCountVotes] = useState<number>(upvotes);

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
          setCountVotes(countVotes + 1);
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
    await axios
      .delete(
        `${isProduction}/projects/${threadId}/threads/${threadId}/messages/${messageId}/upvotes/${loggedUser}`,
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
    <div className={styles.messageContainer}>
      <div className={styles.messageContainerTop}>
        <h3>{username}</h3>
        <h4>{moment(creation_time).fromNow()}</h4>
      </div>
      <div className={styles.messageContainerBot}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <div className={styles.lastContainer}>
        <div className={styles.upvotesContainer}>
          <button
            className={`${
              isUpvoted ? styles.upvoteButtonAfter : styles.upvoteButton
            }`}
            onClick={handleClick}
          >
            {<BiUpvote />}
          </button>
          <h4>{countVotes}</h4>
        </div>
        <div className={styles.editMessage}>
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
