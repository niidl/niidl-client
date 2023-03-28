'use client';
import Cookies from 'js-cookie';
import moment from 'moment';
import styles from '../page.module.scss';
import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { BiUpvote } from 'react-icons/bi';
import { UpvotedMessages } from '../page';
import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
  creation_time: Date;
  username: string;
  projectOwner: string;
  projectId: number;
  threadId: number;
  messageId: number;
  upvotes: number;
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
}: Props) {
  const loggedUser = Cookies.get('userName');
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userUpvotedMessages, setUserUpvotedMessages] = useState<
    UpvotedMessages[] | null
  >();

  let canEdit: boolean = false;
  let canDelete: boolean = false;

  if (loggedUser === username) canEdit = true;
  if (projectOwner === loggedUser) canDelete = true;
  if (projectOwner === username) canDelete = false;

  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);

  function checkUpvote() {
    const idToString: string = messageId.toString();
    for (const threadKey in userUpvotedMessages) {
      if (threadKey === idToString) {
        setIsUpvoted(true);
      }
    }
  }

  async function upvote() {
    await axios
      .post(
        `${isProduction}/projects/${projectId}/threads/${threadId}/messages/${messageId}/upvotes/${loggedUser}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setIsUpvoted(true);
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
        router.refresh();
      });
  }

  function handleClick() {
    isUpvoted ? downvote() : upvote();
  }

  function handleEdit(): void {
    console.log('hello');
  }

  // async function handleEdit(): Promise<void> {
  //   await axios
  //     .put(
  //       `${isProduction}/projects/${projectId}/threads/${threadId}/messages/${messageId}`,
  //       editedMessage,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       router.refresh();
  //     });
  // }

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
        <ReactMarkdown children={content} />
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
          <h4>{upvotes}</h4>
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
    </div>
  );
}
