import React from 'react';

import Facebook from './image/facebook.png';
import Twitter from './image/twitter.png';
import Instagram from './image/instagram.png';
import Quotes from './image/quotes.svg';
import Logo from './image/Logo.svg';

export default function Footer() {
  return (
    <div className="bg-darkBeige h-full w-screen pt-8 font-sans text-darkP">
      <div className="flex flex-row justify-around border-b border-darkP py-4">
        <div className="leading-relaxed w-56 font-medium">
          <p>
            What mental health needs is more sunlight, more candor, and more
            unashamed conversation
          </p>
          <img src={Quotes} className="ml-auto mr-2" />
        </div>
        <div className="lg:w-1/4 md:w-1/2 w-full px-4 flex items-center justify-center">
          <div>
            <h2 className="title-font font-medium text-darkP tracking-widest text-sm mb-3">
              Your Feedback
            </h2>
            <textarea
              className="w-40 sm:w-auto bg-gray-100 rounded xl:mr-4 lg:mr-0 sm:mr-4 mr-2 border border-gray-400 focus:outline-none focus:border-darkP text-base py-2 px-4 resize-none"
              placeholder="Placeholder"
              type="text"
            ></textarea>
          </div>
          <button className="lg:mt-2 xl:mt-0 flex-shrink-0 text-darkP bg-orangeP py-2 px-6 rounded-lg font-medium ml-auto mr-2">
            Submit
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-around mt-4 items-center">
        <p>© 2020 We Care </p>
        <div>
          <img src={Logo} className="w-16 h-16" />
        </div>
        <div className="flex flex-row justify-around w-24 ">
          <div>
            <img src={Facebook} className="w-6 h-6" />
          </div>
          <div>
            <img src={Instagram} className="w-6 h-6" />
          </div>
          <div>
            <img src={Twitter} className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
