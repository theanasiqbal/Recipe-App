"use client";
import React, { useEffect, useState } from 'react';
import SearchCard from '@/components/searchCard';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/Pagination';

const SearchPage = () => {
    const [searchedMeal, setSearchedMeal] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setcurrentPage] = useState(1)
    const [postsPerPage, setpostsPerPage] = useState(12)
    const router = useRouter()

    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`);
                const result = await response.json();
                setData(result.meals);
            } catch (error) {
                console.error('Error fetching the meals:', error);
            }
        };

        getCategory();
    }, [searchedMeal]);

    const handleSearch = () => {
        setSearchedMeal(searchedMeal);
    };

    const lastPostIndex = currentPage * postsPerPage
    const firstPostindex = lastPostIndex - postsPerPage
    const currentPost = data.slice(firstPostindex,lastPostIndex)


    return (
        <>
        <div className='px-8'>
            <div className='w-full px-8 flex items-center gap-5 justify-center'>
                <input 
                    className='border-2 px-3 max-sm:w-3/4 md:w-1/3 py-1 rounded-md border-[#330a05]'
                    type='text' 
                    value={searchedMeal} 
                    onChange={(e) => setSearchedMeal(e.target.value)}
                    placeholder="Aren't You Hungry?"
                />
                <button 
                    className='bg-[#330a05] text-white px-5 py-1 rounded-lg'
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <div className='grid grid-cols-4 max-sm:grid-cols-2 mt-10'>
                {currentPost && currentPost
                    .filter(meal => meal.strMeal.toLowerCase().includes(searchedMeal.toLowerCase()))
                    .map((meal) => (
                        <SearchCard 
                            key={meal.idMeal}
                            name={meal.strMeal}
                            src={meal.strMealThumb}
                            onClick={() => router.push(`/meal/${meal.idMeal}`)}
                        />
                    ))}
            </div>
        </div>
        <div className='flex items-center justify-center mt-6'>
        <Pagination totalPosts={data.length} postsPerPage={postsPerPage} setCurrentPage={setcurrentPage} />
        </div>
        </>
    );
};

export default SearchPage;
