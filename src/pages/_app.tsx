import { type AppType } from "next/dist/shared/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "~/components/icon";
import { createContext, useContext, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { usePageView } from "~/utils/google-analytics";

import "~/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from "~/components/footer";



export type LandingContextType = {
  allowTracking: boolean;
  setAllowTracking: (c: boolean) => void;
};

const LandingContext = createContext<LandingContextType>({
  allowTracking: false,
  setAllowTracking: (v: boolean) => { return {} },
});

export const useGlobalContext = () => useContext(LandingContext);


const MyApp: AppType = ({ Component, pageProps }) => {
  const [allowTracking, setAllowTracking] = useState<boolean>(false);

  usePageView();
  return (
    <main className="relative bg-white grid h-full">
      <div className="w-full flex justify-between items-center px-10 py-6 text-gray-900">
        <Link href='/'>
          <Image
            src='/images/TransitChat-Logo-Horizontal.svg'
            className="h-12 md:h-16 lg:h-20"
            width={200}
            height={200}
            alt="TransitChat Logo"
          />
        </Link>
        <div className="gap-5 flex pb-6">
          <Link href="/">Home</Link>
          <Link href="#about">About</Link>
          <a href={"https://blog.transit.chat/"}>Blog</a>
        </div>
      </div><Component {...pageProps} />
      <CookieConsent
        enableDeclineButton
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="myAwesomeCookieName2"
        onAccept={() => setAllowTracking(true)}
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        By accepting all cookies or browsing this site, you agree to the
        storing of cookies on your device to assist TransitChat in analyzing
        visitor behavior, improving your experience, and delivering tailored
        advertising on and off our sites. Manage cookies here or at the
        bottom of any page.
      </CookieConsent>
      <Footer />
    </main>
  );
};

export default MyApp;
