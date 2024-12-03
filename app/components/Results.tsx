'use client';
import React, { useEffect, useState } from 'react';

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

const Results = () => {
    const [data, setData] = useState<UserData | null>(null);
    const [max, setMax] = useState(-1);

    const grabLimit = (guesses: UserData["guesses"]) => {
        let max = -1;
        for (const key of Object.keys(guesses)) {
            if (guesses[key as keyof GuessesType] > max) {
                max = guesses[key as keyof GuessesType];
            }
        }
        console.log(max);
        console.info(max + Math.floor(max / 5));
        setMax(max + Math.floor(max / 5));
    }

    useEffect(() => {
        const localData = localStorage.getItem('kingdomle-stats');

        if (localData) {
            const data = JSON.parse(localData);
            grabLimit(data.guesses);
            setData(data);
        }

    }, []);

    if (data === null) {
        // Render a loading spinner or placeholder
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full shadow-md rounded-lg p-6 border mt-5 border-gray-200l">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Your Stats</h1>

            <ul className="w-full">
                <h1 className="font-bold text-center text-white mb-4">Number of Guesses</h1>

                {
                    Object.keys(data.guesses).map((key, index) => {
                        const percentage = (data.guesses[key as keyof GuessesType] / max) * 100;
                        if (key !== "fail") {
                            return (
                                <li
                                    key={index}
                                    className="text-left relative block rounded-md border-b-2 border-black"
                                >
                                    <p className="block relative text-black z-10 ml-2">
                                        {key}
                                    </p>
                                    <span className="block absolute top-0 right-0 mr-2 text-right text-white z-10 font-bold">
                                        {data.guesses[key as keyof GuessesType]}
                                    </span>
                                    <span
                                        className="bg-blue-400 block rounded-lg absolute top-0 left-0 overflow-hidden text-blue-400"
                                        style={{ width: percentage < 10 ? "10%" : percentage + "%" }}>
                                        &nbsp;
                                    </span>
                                </li>
                            );
                        }
                    })
                }

            </ul>

            <div className="grid grid-cols-2 gap-4 p-4">
                {/* Current Streak */}
                <div className="flex flex-col items-center justify-center bg-slate-300 p-4 rounded-lg shadow">
                    <h1 className="text-xl font-bold text-blue-600">Current Streak</h1>
                    <p className="text-3xl font-semibold text-gray-800">{data.currentStreak}</p>
                </div>

                {/* Max Streak */}
                <div className="flex flex-col items-center justify-center bg-slate-300 p-4 rounded-lg shadow">
                    <h1 className="text-xl font-bold text-green-600">Max Streak</h1>
                    <p className="text-3xl font-semibold text-gray-800">{data.maxStreak}</p>
                </div>
            </div>
        </div>
    )
}

export default Results