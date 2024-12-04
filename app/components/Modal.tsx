import React from 'react';
import Image from 'next/image';
import Results from './Results';

const Modal = ({ result, url, image, name }: { result: string; url: string; image: string, name: string }) => {

    return (
        <div className="inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

            <div className="flex-col text-center">
                
                <div className="mb-4 justify-items-center">
                    <Image
                        src={image}
                        alt="Modal Content"
                        className="flex-row rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        height="200"
                        width="300"
                    />
                    {result === 'success' ? (
                        <h2 className=" text-2xl font-bold mb-4">You guessed it!</h2>
                    ) : (
                        <h2 className="text-2xl font-bold mb-4">Better luck next time</h2>
                    )}
                    <h2 className="text-xl font-bold text-yellow-400 drop-shadow-[0_0_5px_rgba(255,215,0,0.7)] text-center inline-block px-2 rounded-md relative">
                        It&apos;s <a href={url} className="hover:text-yellow-800">{name}!</a>
                    </h2>
                    <Results/>

                    <div className="flex-row">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-lg font-bold text-white bg-gradient-to-r from-red-600
                             to-black hover:from-black hover:to-red-600 px-4 py-2 rounded-md 
                             shadow-lg transform hover:scale-105 transition-all m-4"
                        >
                            Wiki Entry
                        </a>

                        <a
                            href={"https://michael-shu.com/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-lg font-bold text-white bg-purple-500
                             hover:bg-purple-700 px-4 py-2 
                             rounded-md shadow-lg transform hover:scale-105 transition-all m-4"
                        >
                            My Website
                        </a>

                        <button
                            onClick={() => console.log("We gotta figure out this sharing thing...")}
                            rel="noopener noreferrer"
                            className="cool-beans inline-block text-lg font-bold text-white bg-black
                            hover:text-black hover:bg-slate-400
                                px-4 py-2 
                             rounded-md shadow-lg transform hover:scale-105 transition-all m-4"
                        >
                            Share results(TBD)
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
