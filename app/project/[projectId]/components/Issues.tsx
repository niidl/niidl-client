import Link from 'next/link';
import styles from './Issues.module.scss';
import moment from 'moment';

interface Issue {
  issue_id: number;
  html_url: string;
  title: string;
  created_at: Date;
  issue_author: string;
  author_id: number;
}

export interface Props {
  projectIssues: Issue[];
}

export default function Issues({ projectIssues }: Props) {
  return (
    <div className={styles.issuesContainer}>
      {projectIssues
        ? projectIssues.map((issue: Issue) => {
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
