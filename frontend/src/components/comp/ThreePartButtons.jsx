import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function ThreePartButtons({ options }) {
  const location = useLocation();  // Get the current URL

  return (
    <div>
      {options.map((data, index) => {
        // Check if the current route matches the `to` value
        const isActive = location.pathname === data.to;

        return (
          <Link key={index} to={`${data.to}`}>
            <div
              className={`px-3 py-2 items-center gap-3 mb-1 text-md w-52 rounded-lg flex cursor-pointer 
              ${isActive ? 'bg-zinc-700/60 font-semibold' : 'hover:bg-zinc-700/60 hover:font-semibold'}`}
            >
              <div>{data.icon}</div>
              <h1>{data.optionName}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ThreePartButtons;
