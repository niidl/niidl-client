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

const CodeSpaces = ({ children }: any) => {
  console.log(children);
  const text = children.replace(/ /g, '\u00A0');
  // Replace all space characters with a literal space (\u00A0)
  return <>{text}</>;
};

export { CodeBlock, CodeSpaces };
