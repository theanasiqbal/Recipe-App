
"use client"; 
import React, { useEffect, useState } from 'react';

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
    <div>
      <h1 className='text-4xl font-semibold font-mono text-center text-[#9d3306] mt-5'>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className='w-full max-w-md mx-auto' />
      <div className='mt-4'>
        <h2 className='text-2xl font-semibold'>Instructions</h2>
        <p>{meal.strInstructions}</p>
      </div>
      <div className='mt-4'>
        <h2 className='text-2xl font-semibold'>Ingredients</h2>
        <ul>
          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient = meal[`strIngredient${index + 1}`];
            const measure = meal[`strMeasure${index + 1}`];
            return ingredient ? (
              <li key={index}>
                {measure} {ingredient}
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default MealDetailsPage;
