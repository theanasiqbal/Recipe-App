"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AlphaPageCard from '@/components/AlphaPageCard'
import Pagination from '@/components/Pagination'

const page = () => {
    const [alphabet, setAlphabet] = useState("A")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setcurrentPage] = useState(1)
    const [postsPerPage, setpostsPerPage] = useState(12)
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
            setData(data.meals);
        } catch (error) {
            console.error('Error fetching the categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMealByAlpha();
    }, [alphabet]);


    const lastPostIndex = currentPage * postsPerPage
    const firstPostindex = lastPostIndex - postsPerPage
    const currentPost = data.slice(firstPostindex,lastPostIndex)

    return (
        <>
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
            <div className='max-sm:grid max-sm:grid-cols-2 flex flex-wrap items-center justify-center mt-10 gap-4'>
                {loading ? (
                    <p className='text-center text-blue-500'>Loading...</p>
                ) : currentPost.length > 0 ? (
                    currentPost.map((meal) => (
                        <AlphaPageCard
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
            
        </div>
        <div className='flex items-center justify-center mt-6'>
        <Pagination totalPosts={data.length} postsPerPage={postsPerPage} setCurrentPage={setcurrentPage} />
        </div>
        </>
  )
}

export default page