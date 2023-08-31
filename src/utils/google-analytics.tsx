import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { type UaEventOptions } from "react-ga4/types/ga4";
import { useGlobalContext } from "~/pages/_app";
import { cookies } from 'next/headers'

export const tcPageGA = () => {
  if (!process.env.GA_MEASURE_ID) {
    throw Error("Missing Google Analytics Measure ID");
  }
  ReactGA.initialize(process.env.GA_MEASURE_ID);
};

export const usePageView = () => {
  const { allowTracking } = useGlobalContext();
  const location = usePathname();

  useEffect(() => {
    const cookieStore = cookies()
    const ga = cookieStore.get('google-analytics')
    if (!ga) return;
    ReactGA.send({ hitType: "pageview", page: "window.location.pathname + window.location.search", title: "Page View" });
  }, [allowTracking, location]);
};

export const gaEvent = (allowTracking: boolean, event: string | UaEventOptions) =>
  allowTracking
    ? () => {
      ReactGA.event(event);
      return true;
    }
    : false;
