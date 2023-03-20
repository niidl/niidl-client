import moment from 'moment';

interface Props {
  content: string;
  creation_time: string;
  username: string;
}

export default function Message({ content, creation_time, username }: Props) {
  return (
    <div style={{ margin: '10px 5px' }}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h3>{username}</h3>
        <h4>{moment(creation_time).fromNow()}</h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
