import React from 'react'

const AlphaPageCard = ({name, src, onClick}) => {
  return (
    <div onClick={onClick} className="bg-white rounded-lg flex flex-col items-center justify-center w-full sm:w-1/2 md:w-1/4 lg:w-1/5">
      <a href="#">
        <img width={150} height={150} className="rounded-t-lg" src={src} alt={name} />
      </a>
      <div className="p-5 text-center">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#9d3306]">{name}</h5>
        </a>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center border-2 border-[#330A05] text-[#330A05] rounded-lg"
        >
          View Recipe
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default AlphaPageCard