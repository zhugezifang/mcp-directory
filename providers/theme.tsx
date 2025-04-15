import * as React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-J8KQR8GFM0"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-J8KQR8GFM0');
            `,
        }}
      ></script>
      
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4158779929727637"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
