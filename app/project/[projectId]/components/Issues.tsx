import Link from 'next/link';
import styles from './Issues.module.scss';
import moment from 'moment';

export default function Issues({ projectIssues }: any) {
  return (
    <div className={styles.issuesContainer}>
      {projectIssues
        ? projectIssues.map((issue: any) => {
            return (
              <Link href={`${issue.html_url}`} key={issue.issue_id}>
                <div className={styles.issueInstance}>
                  <div>{issue.title}</div>
                  <div>
                    {moment(issue.created_at).fromNow()} by {issue.issue_author}
                  </div>
                </div>
              </Link>
            );
          })
        : null}
    </div>
  );
}
