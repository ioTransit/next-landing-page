import {
  type NextComponentType,
  type AppType,
  type NextPageContext,
} from "next/dist/shared/lib/utils";
import CookieConsent from "react-cookie-consent";
import { Footer } from "~/components/footer";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";
import Script from "next/script";
import { Header } from "~/components/header";
import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";

const Page = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
}) => {
  const [cookies] = useCookies();

  return (
    <>
      {cookies["google-analytics"] && (
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1G0WGN2N3Q"
        ></Script>
      )}
      {cookies["google-analytics"] && (
        <Script id="gtag">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-1G0WGN2N3Q');
        `}</Script>
      )}
      {cookies["google-analytics"] && (
        <Script id="zohochat">{`window.$crisp=[];window.CRISP_WEBSITE_ID="10341778-33d3-4180-a91c-5f6a4a61927b";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
        `}</Script>
      )}
      <main className="relative grid h-full bg-white">
        <Header />
        <Component {...pageProps} />
        <CookieConsent
          enableDeclineButton
          location="bottom"
          buttonText="Accept"
          declineButtonText="Decline"
          cookieName="google-analytics"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          By accepting all cookies or browsing this site, you agree to the
          storing of cookies on your device to assist TransitChat in analyzing
          visitor behavior, improving your experience, and delivering tailored
          advertising on and off our sites. Manage cookies here or at the bottom
          of any page.
        </CookieConsent>
        <Footer />
      </main>
    </>
  );
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <Page pageProps={pageProps} Component={Component} />
    </CookiesProvider>
  );
};

export default MyApp;
