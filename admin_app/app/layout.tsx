import '@mantine/core/styles.css';
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata = {
  title: 'Admin App',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <head>
        <ColorSchemeScript />
      </head>
      <body>
      <MantineProvider
      theme={{
        primaryColor: 'digipple-orange',
        colors: {
          'digipple-orange': [
            "#fff1e2",
            "#ffe1cc",
            "#ffc39b",
            "#ffa164",
            "#fe8537",
            "#fe731a",
            "#ff6a09",
            "#e45800",
            "#cb4d00",
            "#b14000"
          ] ,
        },
      }}
    >
      
      {children}</MantineProvider>
      </body>
    </html>
  );
}