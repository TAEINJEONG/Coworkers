// pages/_document.tsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const setInitialTheme = `
    (function() {
      try {
        const stored = localStorage.getItem('app-settings');
        const theme = stored
          ? JSON.parse(stored).state.theme
          : window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
    `.trim();

    return (
      <Html>
        <Head />
        <body>
          {/* 이 스크립트가 가장 먼저 실행됩니다 */}
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
