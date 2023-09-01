import Head from "next/head"

export const MetaHeader = () => {
  return (<Head>
    <title>TransitChat</title>
    <meta name="description"
      content="TransitChat is a platform that makes it easier for transit 
                agencies to communicate with their riders and improve 
                their services by organizing issues in one place."
    />
    <meta
      property="og:image"
      content="https://www.transit.chat/images/TransitChat-Logo-Horizontal.svg"
    />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </Head>)
}