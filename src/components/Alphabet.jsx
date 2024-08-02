"use client"
import React, { useEffect, useState } from 'react'
import AlphaCard from './AlphaCard'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Alphabet = () => {
    const [alphabet, setAlphabet] = useState("A")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const alphabets = [];
    for (let i = 65; i <= 90; i++) {
        alphabets.push(String.fromCharCode(i));
    }

    const getMealByAlpha = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alphabet}`);
            const data = await response.json();
            setData(data.meals ? data.meals.slice(0, 4) : []);
        } catch (error) {
            console.error('Error fetching the categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMealByAlpha();
    }, [alphabet]);

    return (
        <div className='mt-14 px-8'>
            <h1 className='font-mono font-semibold text-[#9d3306] text-center text-3xl'>Search By Alphabet</h1>
            <div className='mt-10'>
                <div className="hidden md:flex items-center justify-evenly">
                    {alphabets && alphabets.map((char) => (
                        <button
                            key={char}
                            onClick={() => setAlphabet(char)}
                            className={`border-2 border-[#330A05] px-2 rounded-md ${alphabet === char ? 'bg-[#330A05] text-white' : ''}`}
                        >
                            {char}
                        </button>
                    ))}
                </div>
                <div className="md:hidden flex items-center justify-center">
                    <select
                        value={alphabet}
                        onChange={(e) => setAlphabet(e.target.value)}
                        className="border-2 border-[#330A05] px-2 py-1 rounded-md bg-white text-black"
                    >
                        {alphabets && alphabets.map((char) => (
                            <option key={char} value={char}>
                                {char}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='flex flex-wrap items-center justify-center mt-10 gap-4'>
                {loading ? (
                    <p className='text-center text-blue-500'>Loading...</p>
                ) : data.length > 0 ? (
                    data.map((meal) => (
                        <AlphaCard
                            key={meal.idMeal}
                            name={meal.strMeal}
                            src={meal.strMealThumb}
                            onClick={() => router.push(`/meal/${meal.idMeal}`)}
                        />
                    ))
                ) : (
                    <p className='text-center text-red-500'>Sorry, no recipe starts with {alphabet}</p>
                )}
            </div>
            {data.length > 0 && (
                <div className="flex justify-center mt-6">
                    <Link href={'/alphabet'} className="inline-block rounded-md bg-[#330A05] px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#330A05] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)]">
                        See All Recipes with Alphabets
                    </Link >
                </div>
            )}
        </div>
    )
}

export default Alphabet
