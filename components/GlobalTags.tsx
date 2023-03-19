import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Icons */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={asset("/lojaibyte-favicon.ico")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={asset("/lojaibyte-favicon.ico")}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={asset("/lojaibyte-favicon.ico")}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <meta name="theme-color" content="#221E1F" />
      <meta name="msapplication-TileColor" content="#221E1F" />

      {
        /*
         * Include fonts
         * tip: It's always better copy fonts to the `/static/fonts` folder than serving from another
         * domain since DNS resolution times can really affect performance.
         */
      }
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (min-width: 768px){
            body {
              background-color: #f3f4f6
            }
          }
          
          @font-face {
            font-family: 'Poppins';
            src: url(${asset("/fonts/Poppins-Black.woff2")}) format('woff2'),
                url(${asset("/fonts/Poppins-Black.woff")}) format('woff');
            font-weight: 900;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Poppins';
            src: url(${
            asset("/fonts/Poppins-ExtraBold.woff2")
          }) format('woff2'),
                url(${asset("/fonts/Poppins-ExtraBold.woff")}) format('woff');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Poppins';
            src: url(${asset("/fonts/Poppins-SemiBold.woff2")}) format('woff2'),
                url(${asset("/fonts/Poppins-SemiBold.woff")}) format('woff');
            font-weight: 600;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Poppins';
            src: url(${asset("/fonts/Poppins-Bold.woff2")}) format('woff2'),
                url(${asset("/fonts/Poppins-Bold.woff")}) format('woff');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Poppins';
            src: url(${asset("/fonts/Poppins-Medium.woff2")}) format('woff2'),
                url(${asset("/fonts/Poppins-Medium.woff")}) format('woff');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Poppins';
            src: url(${asset("/fonts/Poppins-Light.woff2")}) format('woff2'),
                url(${asset("/fonts/Poppins-Light.woff")}) format('woff');
            font-weight: 300;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Poppins';
            src: url(${asset("/fonts/Poppins-Regular.woff2")}) format('woff2'),
                url(${asset("/fonts/Poppins-Regular.woff")}) format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Poppins';
            src: url(${asset("/fonts/Poppins-Thin.woff2")}) format('woff2'),
                url(${asset("/fonts/Poppins-Thin.woff")}) format('woff');
            font-weight: 100;
            font-style: normal;
            font-display: swap;
        }
        
        @font-face {
            font-family: 'Poppins';
            src: url(${
            asset("/fonts/Poppins-ExtraLight.woff2")
          } format('woff2'),
                url(${asset("/fonts/Poppins-ExtraLight.woff")}) format('woff');
            font-weight: 200;
            font-style: normal;
            font-display: swap;
        }
      `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
