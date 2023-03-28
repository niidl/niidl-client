'use client';
import moment from 'moment';
import Cookies from 'js-cookie';
import styles from '../page.module.scss';
import { ThreadInfo } from '../page';
import { BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { BiUpvote } from 'react-icons/bi';
import { UpvotedMessages } from '../page';
import ReactMarkdown from 'react-markdown';

interface Props {
  threadInfo: ThreadInfo;
}

const isProduction: string = process.env.PRODUCTION
  ? 'https://niidl.net'
  : 'http://localhost:8080';

export default function ThreadHead({ threadInfo }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const loggedUser = Cookies.get('userName');
  const router = useRouter();

  let canEdit: boolean = false;
  let canDelete: boolean = false;

  if (loggedUser === threadInfo.user.user_name) canEdit = true;
  // if (projectOwner === loggedUser) canDelete = true;
  // if (projectOwner === username) canDelete = false;
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
        router.refresh();
      });
  }

  let isUpvoted = true;

  function handleClick() {
    // isUpvoted ? downvote() : upvote();
    console.log('hello');
  }

  function handleEdit(): void {
    console.log('hello');
  }

  return (
    <div className={styles.threadHead}>
      <h1>{threadInfo.title}</h1>
      <h3>Discussion</h3>
      <div className={styles.userInfoContainer}>
        <h3>{threadInfo.user.user_name}</h3>
        <p>{moment(threadInfo.creation_time).fromNow()}</p>
      </div>
      <p>{threadInfo.content}</p>
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
          <h4>{threadInfo.upvotes}</h4>
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
      <hr />
    </div>
  );
}
