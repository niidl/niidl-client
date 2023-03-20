import Link from 'next/link';
import styles from './Issues.module.scss';
import moment from 'moment';

export default async function Issues() {
  const gitAccount = 'https://github.com/acheong08/EdgeGPT'; //This url is fetched from the ServerSide github URL
  const GitAPI = {
    root: 'https://api.github.com/repos/',
    projectName: '',
    user: '',
  };
  const temp = gitAccount.split('/');
  GitAPI.projectName = temp[temp.length - 1];
  GitAPI.user = temp[temp.length - 2];

  const apiLink =
    GitAPI.root + GitAPI.user + '/' + GitAPI.projectName + '/' + 'issues';

  const data = await fetch(apiLink);
  const res = await data.json();

  return (
    <div className={styles.issuesContainer}>
      {res.map((issue: any) => {
        return (
          <Link href={`${issue.html_url}`} key={issue.id}>
            <div className={styles.issueInstance}>
              <div>{issue.title}</div>
              <div>
                {moment(issue.created_at).fromNow()} by {issue.user.login}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
