
"use client"; 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AlphaPageCard from '@/components/AlphaPageCard';

const RecipeList = ({ category }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipes(data.meals);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [category]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='max-sm:grid max-sm:grid-cols-2 flex flex-wrap items-center justify-center mt-10 gap-4'>
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <AlphaPageCard 
              key={recipe.idMeal}
              src={recipe.strMealThumb}
              name={recipe.strMeal}
              onClick={() => router.push(`/meal/${recipe.idMeal}`)}
          />
          // <div key={recipe.idMeal} className='card'>
          //   <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          //   <h3>{recipe.strMeal}</h3>
          //   <button onClick={() => router.push(`/meal/${recipe.idMeal}`)}>View Details</button>
          // </div>
        ))
      ) : (
        <p>No recipes found for this category.</p>
      )}
    </div>
  );
};

export default RecipeList;
