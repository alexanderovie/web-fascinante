import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { ChatbotProvider, ChatbotFloatingButton, ChatbotWrapper } from '@/components/chatbot';
import { geist } from '@/utils/font';
import { ReactNode, Suspense } from 'react';
import '../globals.css';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${geist.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ChatbotProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <SmoothScrollProvider>{children}</SmoothScrollProvider>
            </Suspense>
            <ChatbotFloatingButton />
            <ChatbotWrapper />
          </ChatbotProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
