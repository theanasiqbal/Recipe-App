"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../components/allCatCard'; 

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching the categories:', error);
      }
    };

    getCategory();
  }, []);

  const handleCategoryClick = (category) => {
    router.push(`/category/${category}`);
  };

  return (
    <div>
      <h1 className='text-4xl font-semibold font-mono text-center text-[#9d3306] mt-5'>Categories</h1>
      <div className='slider-container gap-4 px-8 max-sm:mt-12 md:mt-10'>
        <div className='grid grid-cols-2 md:flex justify-evenly items-center flex-wrap gap-5'>
          {categories && categories.map((cat, index) => (
            <Card
              key={index}
              src={cat.strCategoryThumb}
              name={cat.strCategory}
              onClick={() => handleCategoryClick(cat.strCategory)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
