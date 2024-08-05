import React, { useState } from 'react'


const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {

    const [currentPage, setcurrentPage] = useState(1)

    let pages = [];

    for(let i= 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }

  return (
    <div className='flex gap-4'>
        {
            pages.map((page, index) => (
                <button
                            key={index}
                            onClick={() => {setCurrentPage(page);
                                setcurrentPage(page)
                            }}
                            className={`border-2 border-[#330A05] ${page === currentPage ? 'bg-[#330A05] text-white' : ''} px-2 rounded-md }`}
                        >
                            {page}
                        </button>
            ))
        }
    </div>
  )
}


export default Pagination