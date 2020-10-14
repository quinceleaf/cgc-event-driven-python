import { useState } from "react";
import Link from "next/link";

import { SiGithub, SiLinkedin } from "react-icons/si";

const links = [
  {
    route:
      "https://acloudguru.com/blog/engineering/cloudguruchallenge-python-aws-etl",
    description: "About",
  },
];

const renderLinks = () => {
  return links.map((link) => {
    return (
      <li key={link.description} className="navlink">
        <Link href={link.route}>
          <a className="inline-block pr-6 lg:pb-0 pb-3 text-md text-gray-500 hover:text-gray-400">
            {link.description}
          </a>
        </Link>
      </li>
    );
  });
};

export default function Header() {
  const [showDropdownMenu, toggleDropdownMenu] = useState(false);

  return (
    <header
      className={`${
        showDropdownMenu
          ? "h-auto w-full z-10 lg:px-16 px-6 py-3 flex flex-wrap items-center bg-white border-b border-gray-300 shadow-sm bounce"
          : "h-20 w-full z-10 lg:px-16 px-6 flex flex-wrap items-center bg-white border-b border-gray-300 shadow-sm"
      }}`}
    >
      {/* HOME */}
      <div className="flex-1 flex flex-col justify-start">
        <Link href="/">
          <a className="p-0">
            <span className="font-bold text-2xl tracking-tight text-gray-500">
              Data-Driven ETL with Python
            </span>
          </a>
        </Link>

        <div className="font-light text-sm text-gray-500">
          #CloudGuruChallenge | October 2020
        </div>
      </div>

      {/* TOGGLE MENU */}
      <div
        onClick={() => toggleDropdownMenu(!showDropdownMenu)}
        className=" lg:hidden block"
      >
        <svg
          className="fill-current text-gray-500 hover:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </div>

      {/* BLOG CONTENT LINKS */}
      <div
        className={`${
          showDropdownMenu
            ? "block lg:flex lg:items-center lg:w-auto w-full flex-grow"
            : "hidden lg:flex lg:items-center lg:w-auto w-full flex-grow"
        }}`}
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0 navlist">
            {renderLinks()}

            {/* SOCIAL MEDIA LINKS */}
            <div className="flex flex-row mt-1">
              <li className="navlink">
                <a
                  className="inline-block pr-6 lg:pb-0 pb-3 text-2xl text-gray-500 hover:text-gray-400"
                  href="https://github.com/quinceleaf/cgc-event-driven-python"
                >
                  <SiGithub />
                </a>
              </li>
              <li className="navlink">
                <a
                  className="inline-block pr-6 lg:pb-0 pb-3 text-2xl text-gray-500 hover:text-gray-400"
                  href="https://www.linkedin.com/in/brian-ibbotson/"
                >
                  <SiLinkedin />
                </a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}
