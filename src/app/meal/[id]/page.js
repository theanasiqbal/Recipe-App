
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const MealDetailsPage = ({ params }) => {
  const { id } = params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMealDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      } finally {
        setLoading(false);
      }
    };

    getMealDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!meal) return <p>Meal not found.</p>;

  return (
    <>
      <h1 className='text-4xl font-mono font-bold text-center text-[#9d3306] mt-3'>{meal.strMeal}</h1>
      <div className='px-8 sm:px-8 md:flex justify-center items-center gap-4 mt-12'>

        <div className='max-md:mb-8 md:w-1/2 flex items-center flex-col justify-between gap-8'>

          <a href="#">
            <Image className="rounded-xl" width={350} height={350} src={meal.strMealThumb} alt={meal.strMeal} />
          </a>

        </div>
        <div className='max-md:mb-8 md:w-1/2 flex items-start flex-col jus'>
          <p className=' text-xl font-semibold max-sm:mb-2 text-[#330a05]'>Category:<span className='text-[#9d3306]'> {meal.strCategory}</span></p>
          <p className='font-semibold text-xl'>Origin:<span className='text-[#9d3306]'> {meal.strArea}</span></p>
          <div className='mt-4'>
            <h2 className='text-3xl font-semibold font-mono text-[#9d3306] mb-4'>Ingredients</h2>
            <div className='flex flex-wrap gap-1.5 mt-2'>
              {Array.from({ length: 20 }).map((_, index) => {
                const ingredient = meal[`strIngredient${index + 1}`];
                const measure = meal[`strMeasure${index + 1}`];
                return ingredient ? (
                  <span className='border-2 border-[#330a05] rounded-lg px-2 font-medium' key={index}>
                    {measure} {ingredient}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
      <h2 className='text-3xl font-semibold px-8 md:mt-16 font-mono mt-5 text-[#9d3306]'>Instructions</h2>
      <div className='md:flex items-center justify-center gap-4'>
      <div  className='px-8 mt-4 md:w-4/6 '>
        {meal.strInstructions.split('.').filter(instruction => instruction.trim() !== '')
            .map((instruction, index) => (
          <p className='' key={index}>
          <strong>{index + 1}.</strong> {instruction}
        </p>
        ))}
      </div>
      <div className=' flex items-center justify-center flex-col'>
          <p className='text-[#9d3306] font-medium max-md:px-8 max-md:mt-4'>"Need a visual guide? Check out this YouTube tutorial for step-by-step instructions!"</p>
          <a className='mt-2' href={meal.strYoutube}><button className="inline-block whitespace-nowrap max-md:mt-2 rounded-md border-2 border-[#330A05] px-6 pb-2 pt-2.5 text-sm font-semibold uppercase leading-normal text-[#330A05] shadow-[0_4px_9px_-4px_#330A05] transition duration-150 ease-in-out hover:bg-[#330A05] hover:text-white">Tutorial</button></a>
      </div>
      </div>
    </>
  );
};

export default MealDetailsPage;
