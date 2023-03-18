import './globals.scss';

export const metadata = {
  title: 'niidl',
  description: 'Connecting developers and open-source project organizations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className={'navbar'}>
          <div className={'logo'}>niidl</div>
          <div>
            <button>Login</button>
            <button>Signup</button>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
