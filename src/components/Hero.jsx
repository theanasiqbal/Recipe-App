"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Hero = () => {
    const [random, setRandom] = useState(null);
    const router = useRouter()

    const getRandomRecipe = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            setRandom(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching the meal:', error);
        }
    };
    useEffect(() => {
        getRandomRecipe()

    }, [])
    console.log(random)


    return (
        <div className='px-8 sm:px-8 md:flex justify-center items-center gap-4 mt-2'>
            <div className='max-md:mb-8 md:w-1/2 flex items-center flex-col justify-between gap-8'>
                <h1 className='text-7xl text-[#9d3306] font-bold text-center mb-4 font-mono'>Welcome to,<br /><span className='font-extrabold'>Get Recipe</span></h1>
                <p className='px-4'>"Unlock Your Culinary Creativity and Discover Delicious Recipes Tailored Just for You"</p>
                <div className='grid grid-cols-1 md:flex md:justify-evenly gap-2'>
                <button
                    onClick={getRandomRecipe}
                    className="inline-block whitespace-nowrap rounded-md bg-[#330A05] px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#330A05] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)]"
                >
                    Get Random Recipe
                </button>
                <Link href={"/category"}
                    
                    className="inline-block whitespace-nowrap max-md:mt-2 rounded-md border-2 border-[#330A05] px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-[#330A05] shadow-[0_4px_9px_-4px_#330A05] transition duration-150 ease-in-out hover:bg-[#330A05] hover:text-white"
                >
                    Browse Categories
                </Link>
                </div>
            </div>
            {/* Random Meal */}
            <div className='md:w-1/2  flex flex-col items-center justify-center mt-4 max-md:mt-12'>
                {random && (
                    <div>
                        <h1 className='text-4xl font-semibold text-center mb-5 text-[#9d3306] font-mono'>Random Recipe</h1>

                        <figure onClick={() => router.push(`/meal/${random.meals[0].idMeal}`)} className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 hover:text-white mb-6">
                            <a href="#">
                                <Image className="rounded-xl" width={300} height={300} src={random.meals[0].strMealThumb} alt={random.meals[0].strMeal}/>
                            </a>
                            <figcaption className="absolute px-3 text-lg left-2 font-medium bg-[#9d3306] rounded-md text-white bottom-4">
                                <h2>{random.meals[0].strMeal}</h2>
                            </figcaption>
                        </figure>
                        <div className=''>
                        <p className=' text-xl font-semibold max-sm:mb-2 text-[#330a05]'>Category:<span className='text-[#9d3306]'> {random.meals[0].strCategory}</span></p>
                        <p className='font-semibold text-lg'>Origin:<span className='text-[#9d3306]'> {random.meals[0].strArea}</span></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Hero;
