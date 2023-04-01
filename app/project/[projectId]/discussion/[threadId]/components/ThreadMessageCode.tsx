import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as CodeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ className, children }: any) => {
  let lang = 'text'; // default monospaced text
  if (className && className.startsWith('lang-')) {
    lang = className.replace('lang-', '');
  }
  return (
    <SyntaxHighlighter language={lang} style={CodeStyle}>
      {children}
    </SyntaxHighlighter>
  );
};

export { CodeBlock };
