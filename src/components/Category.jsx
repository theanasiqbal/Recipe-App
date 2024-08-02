"use client"
import React, { useEffect, useState } from 'react';
import Card from './CategoryCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const router = useRouter()

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

    var settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return (
        <>
        {/* // <div className='mt-10 md:flex md:flex-col md:items-center md:justify-center'>*/}
            <h1 className='text-4xl font-semibold font-mono text-center text-[#9d3306] mt-12'>Categories</h1> 
            <div className='slider-container gap-4 px-8 max-sm:mt-12 md:mt-10'>
            <Slider {...settings}>
                {categories && categories.map((cat, index) => (
                    
                    <Card
                        key={index}
                        src={cat.strCategoryThumb}
                        name={cat.strCategory}
                        onClick={() => handleCategoryClick(cat.strCategory)}
                    />
                    
                ))}
            </Slider>
            </div>
            <div className='w-full text-center mt-5'>
            <Link href={'/category'}
                className="mt-10 mx-auto inline-block rounded-md bg-[#330A05] px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#330A05] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.3),0_4px_18px_0_rgba(0,0,0,0.2)]"
            >
                See All Categories
            </Link>
            </div>
         
        </>
    );
};

export default Category;
