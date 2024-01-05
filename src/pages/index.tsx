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
                src="/images/chat-bubbles.svg"
                alt="Chat bubbles in the background of the hero"
              />
              <div className="absolute inset-0 mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-left text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <p className="block text-tcOrange drop-shadow-md md:w-[80%]">
                  Stop losing rider complaints in endless email threads.
                </p>
              </h1>
              <p className="mt-6 max-w-lg text-left text-2xl text-gray-900 sm:max-w-3xl">
                You should be able to read your rider’s complaints and
                collaborate without forgetting to click reply all. TransitChat
                stores all of your rider feedback and conversations without
                searching through email threads and forwarding conversations.
              </p>
              <div className=" mt-10 sm:flex">
                <Link
                  href={"/demo"}
                  className="flex h-16 items-center justify-center rounded-md border border-transparent bg-tcOrange px-4 py-3 text-xl font-medium text-white shadow-sm drop-shadow-md transition-colors hover:bg-yellow-400 sm:px-8"
                >
                  Check out our demo
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="background-rect mt-32 gap-32 md:mt-48 md:gap-48"
          id="about"
        >
          <div
            id="workflow"
            className="z-30 mx-auto grid justify-between  gap-10 px-20 py-2 md:gap-20 xl:flex"
          >
            <div className="mx-auto grid w-full max-w-[370px] gap-3 sm:w-3/4 xl:w-1/4">
              <h3 className="text-center text-3xl font-extrabold md:text-4xl">
                Respond
              </h3>
              <p className="text-2xl">
                {
                  "Easy to use tools to see vehicle positions and performance with forms to document issues and complaints"
                }
              </p>
            </div>
            <h3 className="m-auto rotate-90 text-6xl xl:rotate-0 ">👉</h3>
            <div className="mx-auto grid w-full max-w-[370px] gap-3 sm:w-3/4 xl:w-1/4">
              <h3 className="text-center text-3xl font-extrabold lg:text-4xl">
                Summarize✨
              </h3>
              <p className="text-2xl">
                TransitChat reads all of your feedback and delivers you a
                summary in email on a regular schedule
              </p>
            </div>
            <h3 className="m-auto rotate-90 text-6xl xl:rotate-0">👉</h3>
            <div className="mx-auto grid w-full max-w-[370px] gap-3 sm:w-3/4 xl:w-1/4">
              <h3 className="text-center text-3xl font-extrabold lg:text-4xl">
                Plan
              </h3>
              <p className="text-2xl">
                Track route issues, collaborate with teams and create tickets
                without relying and forwarding long email threads
              </p>
            </div>
          </div>

          <h3 className="m-auto w-3/4 text-3xl italic text-gray-700 lg:text-4xl">
            "Whether you are the ceo or a service planner you will all be on the
            same page of if you read TransitChat summaries"
          </h3>

          {[
            {
              title: "Tag issues and complaints with locations and routes",
              p: "Emails can be lost and hard to search through, TransitChat easily tags issues with location and route making it easy to find things for Triennial Reviews",
              img: "/images/route-tickets.svg",
            },
            {
              title:
                "Never forget to CC your coworker again on a rider complaint",
              p: "With TransitChat you don't have to scroll through endless email threads all issues and communications are in one place and easy to find",
              img: "/images/Bus-map-illustration.svg",
            },
            {
              title:
                "Stop having meetings just to get everyone caught up to speed",
              p: "We’ll keep you informed by emailing your whole team summaries of what your riders and staff are saying so you can focus on finding solutions.",
              img: "/images/Email-updates.svg",
            },
          ].map((item, k) => {
            return (
              <div key={k} className="z-30 mx-auto max-w-7xl px-4 py-2">
                <div className="flex flex-col-reverse justify-center gap-5 lg:flex-row ">
                  <div className="mx-auto mt-12 grid w-full gap-4 sm:w-2/3 lg:m-0 lg:mt-0 lg:w-1/2">
                    <h3 className="text-3xl font-extrabold text-tcOrange drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-2xl">{item.p}</p>
                    <div className="mt-10 h-16 sm:flex">
                      <Link
                        href={"/demo"}
                        className="flex items-center justify-center rounded-md border border-transparent bg-tcOrange px-4 py-3 text-xl font-medium text-white shadow-sm drop-shadow-md transition-colors hover:bg-yellow-400 sm:px-8"
                      >
                        Check out our demo
                      </Link>
                    </div>
                  </div>
                  <Image
                    className="mx-auto h-full w-5/6 sm:w-3/5 lg:m-0 lg:w-2/5"
                    src={item.img}
                    width={200}
                    height={200}
                    alt="chat conversation illustration"
                  />
                </div>
              </div>
            );
          })}
          <div className="m-auto w-full gap-4" id="pricing">
            <div className="m-auto mb-20 grid w-1/2 items-center gap-6 lg:w-full ">
              <h2 className="text-center text-3xl font-bold">
                Early Bird Pricing
              </h2>
              <h3 className="mx-auto text-2xl">60 Day free trial</h3>
              <div className="m-auto flex flex-col items-center justify-center gap-5 lg:flex-row">
                <Link
                  href="/demo"
                  className="flex h-60 w-60 flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-white p-4 text-gray-600 drop-shadow-sm transition-all hover:cursor-pointer hover:drop-shadow-lg"
                >
                  <h3 className="text-3xl">Circulator</h3>
                  <h4 className="my-3 text-2xl font-medium text-black">
                    <span className="strikethrough text-red-600">$12k</span> $8k
                  </h4>
                  <span className="m-0 p-0 text-xl">Per year</span>
                  <span className="m-0 p-0 text-xl ">1-5 Users</span>
                </Link>
                <Link
                  href="/demo"
                  className="flex flex-col justify-center bg-white text-gray-600 drop-shadow-sm transition-all hover:cursor-pointer  hover:drop-shadow-lg"
                >
                  <span className="w-full rounded-t-lg bg-purple-500 text-center text-lg text-white">
                    Popular
                  </span>
                  <div className="flex h-60 w-60 flex-col items-center justify-center rounded-b-lg border-2 border-t-0 border-gray-400 bg-white p-4 text-gray-600 drop-shadow-sm">
                    <h3 className="text-3xl">Express</h3>
                    <h4 className="my-3 text-2xl font-medium text-black">
                      <span className="strikethrough text-red-600">$24k</span>{" "}
                      $18k
                    </h4>
                    <span className="m-0 p-0 text-xl">Per year</span>
                    <span className="m-0 p-0 text-xl ">5-10 Users</span>
                  </div>
                </Link>
                <Link
                  href="/demo"
                  className="flex h-60 w-60 flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-white p-4 text-gray-600 drop-shadow-sm transition-all hover:cursor-pointer hover:cursor-pointer hover:drop-shadow-lg"
                >
                  <h3 className="text-3xl">Metro</h3>
                  <h4 className="my-3 text-2xl font-medium text-black">
                    Contact
                  </h4>
                  <span className="m-0 p-0 text-xl">Per year</span>
                  <span className="m-0 p-0 text-xl ">10+ Users</span>
                </Link>
              </div>
              <div className="">
                <ul className="mx-auto list-decimal text-center text-lg leading-8">
                  <li>Collect and Comunicate about on going issues</li>
                  <li>Visualize vehicles in real-time with GTFS-RT</li>
                  <li>Email digests for route and stop issues</li>
                  <li>Retain issues and communication for federal reporting</li>
                </ul>
              </div>
            </div>
            <div className="mx-auto grid w-1/2 gap-6">
              <h2 className="text-center text-3xl font-bold">
                Want to learn more?
              </h2>
              <div className="m-auto mb-20 flex justify-center">
                <Link
                  href={"/demo"}
                  className="flex h-16 items-center justify-center rounded-md border border-transparent bg-tcOrange px-4 py-3 text-center text-xl font-medium text-white shadow-sm drop-shadow-md transition-colors hover:bg-yellow-400 sm:px-8"
                >
                  Check out our demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
