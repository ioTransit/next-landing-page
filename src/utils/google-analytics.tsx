import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { type UaEventOptions } from "react-ga4/types/ga4";
import { useGlobalContext } from "~/pages/_app";

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
    if (!allowTracking) return;
    console.log('tracking')
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
