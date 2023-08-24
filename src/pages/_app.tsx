import { type AppType } from "next/dist/shared/lib/utils";
import Link from "next/link";
// import Logo from "../images/logo.png";
import Image from "next/image";
import "~/styles/globals.css";
import { Icon } from "~/components/icon";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (<main className="relative bg-white grid">
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
    <footer className="absolute bottom-0 w-full bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex justify-between">
          <div className="justify-between px-5 py-2 w-full pr-20 lg:w-5/6 flex items-center">
            <Image
              src='/images/TransitChat-Logo-Horizontal.svg'
              className="h-12 md:h-16 lg:h-20"
              width={200}
              height={200}
              alt="TransitChat Logo"
            />
            <Link
              href="/"
              className="text-base text-gray-500 hover:text-tcOrange"
            >
              Home
            </Link>
            <Link href="#About" className="text-base text-gray-500 hover:text-tcOrange">
              About
            </Link>
            <Link href="https://blog.transit.chat" className="text-base text-gray-500 hover:text-tcOrange">
              Blog
            </Link>
            <div className="grid px-5 py-2 mr-20 sm:mr-0">
              <Link href='https://www.linkedin.com/company/transit-chat'>
                <Icon id='ri-linkedin-box-fill' className='text-gray-500 text-3xl hover:text-tcOrange' />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  </main>
  );
};

export default MyApp;
