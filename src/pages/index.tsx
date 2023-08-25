import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>TransitChat</title>
        <meta name="description"
          content="TransitChat is a platform that makes it easier for transit 
        agencies to communicate with their riders and improve 
        their services by organizing issues in one place."
        />
      </Head>
      <div className="relative sm:pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative sm:rounded-2xl">
            <div className="absolute right-0 w-2/3">
              <Image
                className="absolute right-0"
                width={600}
                height={600}
                src='/images/chat-bubbles.svg'
                alt="Chat bubbles in the background of the hero"
              />
              <div className="absolute inset-0 mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-left text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-tcOrange drop-shadow-md">
                  Listen to your rider’s complaints and communicate about
                  solutions
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-left text-2xl text-gray-900 sm:max-w-3xl">
                TransitChat makes it simple for transit agencies to document your
                rider’s needs and summarizes them into simple emails and voice
                notes
              </p>
              <div className=" mt-10 sm:flex">
                <Link
                  href={"/check-agency"}
                  className="h-16 drop-shadow-md flex transition-colors items-center justify-center rounded-md border border-transparent bg-tcOrange px-4 py-3 text-xl font-medium text-white shadow-sm hover:bg-yellow-400 sm:px-8"
                >
                  See if your agency is available
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="background-rect" id="about">
          <div id='workflow' className="max-w-7xl py-2 z-30 mt-32 md:mt-48 grid lg:flex items-center justify-between mx-auto px-20 gap-10"
          >
            <div className="w-full sm:w-3/4 mx-auto lg:w-1/4 gap-3 grid">
              <h3 className="font-extrabold text-3xl text-center">Customer Service</h3>
              <p>With TransitChat has all the tools your need to document your rider’s complaints and communicate about solutions.</p>
            </div>
            <h3 className="text-6xl mx-auto rotate-90 lg:rotate-0">👉</h3>
            <div className="w-full sm:w-3/4 mx-auto lg:w-1/4 gap-3 grid">
              <h3 className="font-extrabold text-3xl text-center">The Magic✨</h3>
              <p>TransitChat summarizes all of your feedback and delivers you a summary in email and podcast format on a regular schedule.</p>
            </div>
            <h3 className="text-6xl mx-auto rotate-90 lg:rotate-0">👉</h3>
            <div className="w-full sm:w-3/4 mx-auto lg:w-1/4 gap-3 grid">
              <h3 className="font-extrabold text-3xl text-center">Planning & Operations</h3>
              <p>Planning and operations can respond to and track feedback without relying on email.
                TransitChat allows you to easily tag and organize issues for future schedules an field work tickets</p>
            </div>
          </div>
          {[
            {
              title: "Using ChatGPT to make call centers respond faster",
              p: "We’ve trained AI to work with transit to quickly document customer issues by turning written text into well documented forms.",
              img: '/images/Chat-Illustration.svg',
            },
            {
              title:
                "Communicate and track issues across transit agency departments",
              p: "TransitChat allows teams to communicate about rider issues without email and tracks conversations from complaint to completion.",
              img: '/images/Bus-map-illustration.png',
            },
            {
              title: "Rider feedback summaries in your email",
              p: "We’ll keep you informed by emailing you summaries of what your riders are saying so you can focus on your work.",
              img: '/images/Email-updates.svg',
            },
          ].map((item, k) => {
            return (
              <div
                key={k}
                className="mx-auto max-w-7xl px-4 py-2 z-30 mt-32 md:mt-48"
              >
                <div className="flex flex-col-reverse lg:flex-row gap-5 justify-center ">
                  <div className="grid gap-4 w-full sm:w-2/3 lg:w-1/2 mt-12 lg:mt-0 mx-auto lg:m-0">
                    <h3 className="font-extrabold text-tcOrange text-3xl drop-shadow-md">{item.title}</h3>
                    <p className="text-2xl">{item.p}</p>
                    <div className="mt-10 sm:flex h-16">
                      <Link
                        href={"/check-agency"}
                        className="drop-shadow-md flex transition-colors items-center justify-center rounded-md border border-transparent bg-tcOrange px-4 py-3 text-xl font-medium text-white shadow-sm hover:bg-yellow-400 sm:px-8"
                      >
                        See if your agency is available
                      </Link>
                    </div>
                  </div>
                  <Image
                    className="w-5/6 h-full mx-auto lg:m-0 sm:w-3/5 lg:w-2/5"
                    src={item.img}
                    width={200}
                    height={200}
                    alt="chat conversation illustration"
                  />
                </div>
              </div>
            );
          })}
          <div className="m-auto justify-center mt-32 gap-4" id="pricing">
            <div className="grid gap-6 w-1/2 mx-auto">
              <h2 className="text-3xl font-bold text-center">
                Sign up for Early Access
              </h2>
              <div className="flex justify-center m-auto">
                <Link
                  href={"/check-agency"}
                  className="h-16 drop-shadow-md bg-tcOrange flex transition-colors items-center justify-center rounded-md border border-transparent px-4 py-3 text-xl font-medium text-white shadow-sm hover:bg-yellow-400 sm:px-8"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
