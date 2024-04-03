import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en"> 
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>  
      <Head />
      <body className={'flex flex-col bg-custom-bg items-center justify-center mt-3 text-lg text-custom-text'}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
