'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Toastify from 'toastify-js';
import Modal from './Modal';

type GuessesType = {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    fail: number;
};

type UserData = {
    currentStreak: number; // Current winning streak
    gamesPlayed: number;   // Total games played
    gamesWon: number;      // Total games won
    guesses: GuessesType;  // Object representing guesses distribution
    maxStreak: number;     // Maximum winning streak
    timeStamp: Date;       // Date of current 
};

const Game = ({ images, name, url, names }: { images: string[], name: string, url: string, names: string[] }) => {
    const [picIndex, setPicIndex] = useState(0);
    const [charName, setCharName] = useState("");
    const [charNames, setCharNames] = useState(names);
    const [guesses, setGuesses] = useState<string[]>(["", "", "", "", "", ""]);

    const [finished, setFinished] = useState(false);
    const [result, setResult] = useState("");

    const [modal, setModal] = useState(true);

    useEffect(() => {
        const localData = localStorage.getItem('kingdomle-stats');

        
        //If local data exists, that means they've played before.
        if (localData !== null) {
            
            const userStorage = JSON.parse(localData);

            const currentDate = new Date();
            const storedDate = new Date(userStorage.timeStamp);

            if (
                currentDate.getFullYear() === storedDate.getFullYear() &&
                storedDate.getMonth() === storedDate.getMonth() &&
                storedDate.getDate() === storedDate.getDate()
            ) {
                if(userStorage.currentStreak >= 1) {
                    setResult("success");
                } else {
                    setResult("failure");
                }
                setFinished(true);
            }
        }
    });

    const submitGuess = () => {
        if (names.includes(charName)) {
            //If the guess is correct
            if (charName === name.replace(/_/g, ' ')) {

                const localData = localStorage.getItem('kingdomle-stats');

                //If local data exists, that means they've played before.
                if (localData !== null) {
                    const userStorage = JSON.parse(localData);
                    userStorage.currentStreak += 1;
                    userStorage.gamesPlayed += 1;
                    userStorage.gamesWon += 1;
                    userStorage.timeStamp = new Date();

                    if (picIndex + 1 in userStorage.guesses) {
                        userStorage.guesses[picIndex + 1 as keyof GuessesType] += 1; // Increment dynamically
                    }
                    if (userStorage.currentStreak > userStorage.maxStreak) {
                        userStorage.maxStreak = userStorage.currentStreak;
                    }
                    localStorage.setItem("kingdomle-stats", JSON.stringify(userStorage));
                } else {
                    const userData: UserData = {
                        currentStreak: 1,
                        gamesPlayed: 1,
                        gamesWon: 1,
                        guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, "fail": 0 },
                        maxStreak: 1,
                        timeStamp: new Date(),
                    };
                    if ((picIndex + 1).toString() in userData.guesses) {
                        //console.log("Ok so we're gonig ot increment guesses...");
                        userData.guesses[picIndex as keyof GuessesType] += 1; // Increment dynamically
                    }
                    //console.log(userData);
                    localStorage.setItem("kingdomle-stats", JSON.stringify(userData));
                }
                setResult("success");
                setFinished(true);

            } else {
                //If its their last guess
                if (picIndex === 5) {
                    const localData = localStorage.getItem('kingdomle-stats');

                    //If local data exists, that means they've played before.
                    if (localData !== null) {
                        const userStorage = JSON.parse(localData);
                        userStorage.currentStreak = 0;
                        userStorage.gamesPlayed += 1;
                        userStorage.timeStamp = new Date();

                        localStorage.setItem("kingdomle-stats", JSON.stringify(userStorage));

                    } else {
                        const userData: UserData = {
                            currentStreak: 0,
                            gamesPlayed: 1,
                            gamesWon: 0,
                            guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, "fail": 1 },
                            maxStreak: 0,
                            timeStamp: new Date(),
                        };

                        //console.log(userData);
                        localStorage.setItem("kingdomle-stats", JSON.stringify(userData));

                    }
                    setResult("failure");
                    setFinished(true);

                } else {
                    //Add guess to list
                    const newGuesses = [...guesses];
                    newGuesses[picIndex] = charName;
                    setGuesses(newGuesses);

                    //increment pic index, serve next less blurry image and also increase index for guess array
                    setPicIndex(picIndex + 1);

                    //Remove guessed name from names, clear input field
                    setCharNames(charNames.filter((name) => name !== charName));
                    setCharName("");
                }
            }

        } else {
            Toastify({
                text: "Please select one of the options",
                duration: 3000,
                close: true,
                gravity: "top", // Still required for vertical alignment
                position: "left", // Use "left" and override it with CSS
                stopOnFocus: true,
                offset: {
                    x: -150,
                    y: 0
                },
                style: {
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "300px",
                    textAlign: "center",
                    left: "50%",
                    position: "absolute",
                    transform: "translateX(-50%)",
                },
                // Override Toastify's built-in positioning
                onClick: function () { }, // Add this to prevent default dismissal if clicked
            }).showToast();
        }
    }

    return (
        <div className="flex-col justify-items-center">
            {modal &&
                <div className="absolute top-1/2 left-1/2 
                transform -translate-x-1/2 -translate-y-1/2 bg-gray-500
                 text-black p-8 rounded-lg shadow-2xl w-3/4 max-w-md z-50">
                    {/* Close Button */}
                    <div className="flex justify-end">
                        <button
                            className="text-red-500 font-bold text-lg hover:text-red-700 transition duration-300"
                            onClick={() => setModal(false)}
                        >
                            ×
                        </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-center text-white mb-4">
                        Welcome to Kingdomle!
                    </h2>

                    {/* Content */}
                    <p className="text-center leading-relaxed">
                        This is <span className="font-bold text-white">Kingdomle</span>, a
                        guessing game for the famous manga <span className="italic">Kingdom</span> by Japanese Manga Artist Yasuhisa Hara.
                        You have six guesses to figure out the manga character in the blurred
                        image. Each successive guess will unblur the image a little more. Good
                        luck!
                    </p>
                </div>

            }

            {finished ?
                (<Modal result={result}
                    url={url}
                    image={"/blurred_images/" + name + "/" + images[images.length - 1]}
                    name={name.replace('_', ' ')} />)
                :
                (
                    <>
                        <Image src={"/blurred_images/" + name + "/" + images[picIndex]} alt={images[picIndex]} height="200" width="300" />

                        <div className="m-1 p-4 bg-gray-800 rounded-lg shadow-md flex items-center space-x-4">

                            <div className="relative w-full max-w-sm">
                                <input
                                    className="w-full bg-black text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    list="names"
                                    value={charName}
                                    onChange={(e) => setCharName(e.target.value)}
                                    placeholder="Type your guess!"
                                />
                                <datalist id="names">
                                    {charNames.map((char, index) => (
                                        <option key={index}>{char}</option>
                                    ))}
                                </datalist>
                            </div>

                            <button
                                onClick={submitGuess}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                            >
                                Submit
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 mt-4 items-center">
                            {guesses.map((value, key) => (
                                <div
                                    key={key}
                                    className="w-[300px] h-12 flex items-center justify-center border-2 border-gray-600 bg-gray-800 rounded-md text-white text-lg font-semibold"
                                >
                                    <span className="float-left">   </span>
                                    {value}
                                </div>
                            ))}
                        </div>
                    </>
                )}

        </div>
    );
}

export default Game;