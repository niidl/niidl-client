import moment from 'moment';
import styles from '../page.module.scss';

interface Props {
  content: string;
  creation_time: Date;
  username: string;
}
/*
*/

export default function ThreadMessage({
  content,
  creation_time,
  username,
}: Props) {
  return (
    <div style={{ margin: '10px 5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{username}</h3>
        <h4>{moment(creation_time).fromNow()}</h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
