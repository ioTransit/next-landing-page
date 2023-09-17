import Link from "next/link";
import Image from "next/image";
import { MetaHeader } from "~/components/meta";

export default function HomePage() {
  return (
    <div>
      <MetaHeader />
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
                <p className="block text-tcOrange drop-shadow-md">
                  Stop losing rider complaints in endless email threads.
                </p>
                {/* <span className="block text-tcOrange drop-shadow-md">
                  Magically turn rider feedback into
                  focused goals to improve service
                </span> */}
                {/* <span className="block text-tcOrange drop-shadow-md">
                  Listen to your rider’s complaints and communicate about
                  solutions
                </span> */}
              </h1>
              <p className="mt-6 max-w-lg text-left text-2xl text-gray-900 sm:max-w-3xl">
                You should be able to read your rider’s complaints and
                collaborate without forgetting to click reply all.
                TransitChat stores all of your rider feedback and conversations
                without searching through email threads and forwarding conversations.
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

        <div className="background-rect gap-20" id="about">
          <div id='workflow' className="py-2 z-30 mt-32 md:mt-48 grid lg:flex  justify-between mx-auto px-20 gap-10 md:gap-20"
          >
            <div className="w-full sm:w-3/4 mx-auto lg:w-1/4 gap-3 grid max-w-[380px]">
              <h3 className="font-extrabold text-3xl text-center md:text-4xl">Respond</h3>
              <p className="text-lg md:text-xl">{"Easy to use tools to see vehicle positions and performance with forms to document issues and complaints"}</p>
            </div>
            <h3 className="text-6xl m-auto rotate-90 lg:rotate-0 ">👉</h3>
            <div className="w-full sm:w-3/4 mx-auto lg:w-1/4 gap-3 grid max-w-[380px]">
              <h3 className="font-extrabold text-3xl text-center lg:text-4xl">Summarize✨</h3>
              <p className="text-lg md:text-xl">TransitChat reads all of your feedback and delivers you a summary in email on a regular schedule</p>
            </div>
            <h3 className="text-6xl m-auto rotate-90 lg:rotate-0">👉</h3>
            <div className="w-full sm:w-3/4 mx-auto lg:w-1/4 gap-3 grid max-w-[380px]">
              <h3 className="font-extrabold text-3xl text-center lg:text-4xl">Plan</h3>
              <p className="text-lg md:text-xl">Track route issues, collaborate with teams and create tickets without relying and forwarding long email threads</p>
            </div>
          </div>

          <div>
            <h3 className="text-3xl lg:text-4xl m-auto italic text-gray-700 w-3/4">"Whether you are the ceo or a service planner you will all be on the same page of what happened if you read TransitChat summaries"</h3>
          </div>


          {[
            {
              title: "Using ChatGPT to make call centers respond faster",
              p: "We’ve trained AI to work with transit data to quickly document customer issues by turning written text into well-documented forms.",
              img: '/images/Chat-Illustration.svg',
            },
            {
              title:
                "Communicate and track issues across transit agency departments",
              p: "TransitChat allows teams to communicate about rider issues without email and tracks conversations from complaint to completion.",
              img: '/images/Bus-map-illustration.svg',
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
          <div className="m-auto justify-center mt-32 gap-4 w-full" id="pricing">
            <div className="grid gap-6 w-1/2 mx-auto">
              <h2 className="text-3xl font-bold text-center">
                Sign up for Early Access
              </h2>
              <div className="flex justify-center m-auto mb-20">
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
    </div>
  );
}
