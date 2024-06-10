import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/redux/ReduxProvider';
import ReactQueryProvider from '@/decorators/ReactQueryProvider';
import StyledComponentsThemeProvider from '@/decorators/StylesComponentsThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/decorators/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="light">
      <html lang="en">
        <ReactQueryProvider>
          <StyledComponentsThemeProvider>
            <ReduxProvider>
              <body className={inter.className}>
                <Toaster />
                {children}
              </body>
            </ReduxProvider>
          </StyledComponentsThemeProvider>
        </ReactQueryProvider>
      </html>
    </ThemeProvider>
  );
}

// import '@/styles/globals.css';
// import { Inter as FontSans } from 'next/font/google';

// import { cn } from '../@/lib/utils';

// export const fontSans = FontSans({
//   subsets: ['latin'],
//   variable: '--font-sans',
// });

// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head />
//       <body
//         className={cn(
//           'min-h-screen bg-background font-sans antialiased',
//           fontSans.variable
//         )}
//       >
//         ...
//       </body>
//     </html>
//   );
// }
