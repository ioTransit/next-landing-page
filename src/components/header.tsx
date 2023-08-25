import { Icon } from "./icon";
import { MenuDropdown } from "./menu-dropdown";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="w-full flex justify-between items-center px-10 py-6 text-gray-900">
      <Link href='/'>
        <Image
          src='/images/TransitChat-Logo-Horizontal.svg'
          className="h-12 md:h-16 lg:h-20"
          alt="TransitChat Logo"
        />
      </Link>
      <div className="gap-5 flex pb-6">
        <Link href="/">Home</Link>
        <Link href={"https://blog.transit.chat/"}>Blog</Link>
      </div>
    </div>
  );
};

export const AdminHeader = ({
  userName,
}: {
  userName: string;
}) => {
  return (
    <div className="w-full flex justify-between items-center px-10 py-6 text-gray-900">
      <Image
        src='/images/TransitChat-Logo-Horizontal.svg'
        className="h-12 md:h-16 lg:h-20"
        alt="TransitChat Logo"
      />
      <div className="gap-5 flex pb-6">
        <span className="text-extrabold text-xl">{userName}</span>
        <MenuDropdown
          icon={<Icon id='ri-arrow-down-s-line' className='text-gray-500 text-lg' />}
          linksList={[
            { name: "Account Settings", url: "/account-settings" },
            { name: "Documentation", url: "/documentation" },
          ]}
        />
      </div>
    </div>
  );
};
