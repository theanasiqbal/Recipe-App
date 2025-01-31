
"use client"; 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AlphaPageCard from '@/components/AlphaPageCard';
import Pagination from '@/components/Pagination';

const RecipeList = ({ category }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(12)
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

  const lastPostIndex = currentPage * postsPerPage
  const firstPostindex = lastPostIndex - postsPerPage

  const currentPost = recipes.slice(firstPostindex,lastPostIndex)

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <div className='max-sm:grid max-sm:grid-cols-2 flex flex-wrap items-center justify-center mt-10 gap-4'>
      {currentPost && currentPost.length > 0 ? (
        currentPost.map((recipe) => (
          <AlphaPageCard 
              key={recipe.idMeal}
              src={recipe.strMealThumb}
              name={recipe.strMeal}
              onClick={() => router.push(`/meal/${recipe.idMeal}`)}
          />
          
        ))
      ) : (
        <p>No recipes found for this category.</p>
      )}

      
    </div>
    <div className='flex items-center justify-center mt-6'>
    <Pagination totalPosts={recipes.length} postsPerPage={postsPerPage} setCurrentPage={setcurrentPage} />
    </div>
    </>
  );
};

export default RecipeList;
