
"use client";
import React from 'react';
import RecipeList from './RecipeList';

const CategoryPage = ({ params }) => {
    const { category } = params;

    return (
        <div>
            <h1 className='text-4xl font-semibold font-mono text-center text-[#9d3306] mt-5'>{category} Recipes</h1>
            <RecipeList category={category} />
        </div>
    );
};

export default CategoryPage;
