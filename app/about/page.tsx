import React from 'react';
import Image from 'next/image';
//import Navbar from '../Navbar';

const page = () => {
  return (
    <>
    
        <div className="max-w-5xl mx-auto p-8 bg-black">

            
          <div className="flex flex-col md:flex-row items-center mb-10 text-gray-200">
            <div className="bg-gray-700 rounded-xl p-8 md:w-1/2 mb-4 md:mb-0">
              <h1 className="text-5xl font-bold mb-4">Kingdomdle</h1>
              <p className="text-xl mb-4">
                Hi I&apos;m Michael, I hope you enjoy the app.
              </p>
              <p className="text-xl">
                If you have any concerns, bug reports, or otherwise, please contact me on my LinkedIn or Github!
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                className="rounded-xl"
                src="/Profile Photo.jpg"
                alt="Michael"
                width={300}
                height={300}
              />
            </div>
          </div>

          <div className="flex justify-around bg-gray-700 p-4 rounded-xl mb-10">
        <a href="https://www.linkedin.com/in/michael-shu-1ba7b0215/" target="_blank" rel="noopener noreferrer">
          <Image
            className="rounded"
            src="/linkedin_logo.png"
            alt="LinkedIn"
            width={150}
            height={50}
          />
        </a>
        <a href="https://github.com/michael-shu" target="_blank" rel="noopener noreferrer">
          <Image
            className="rounded"
            src="/github_logo.png"
            alt="GitHub"
            width={150}
            height={50}
          />
        </a>
      </div>
    
          
        </div>
        </>
  );
};

export default page;