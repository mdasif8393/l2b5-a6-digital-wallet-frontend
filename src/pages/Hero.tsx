import { Link } from "react-router";

import Wallet from "../assets/images/digital wallet.jpg";

const Hero = () => {
  return (
    <section className="bg-white lg:grid lg:h-screen lg:place-content-center dark:bg-gray-900">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            Digital Wallet for
            <strong className="text-indigo-600"> Cashless transactions </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
            You can securely Cash In, Cash Out, Send Money, Receive Money with a
            minimum charge.
          </p>

          <div className="mt-4 flex gap-4 sm:mt-6">
            <Link
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
              to="/about"
            >
              Learn More
            </Link>
          </div>
        </div>

        <img src={Wallet} alt="" />
      </div>
    </section>
  );
};

export default Hero;
