import React from 'react'
import { Link } from 'react-router-dom'


function ThreePartButtons({options}) {
  return (
    
        <div>
            {options.map((data, index)=>(
            <Link to={`${data.to}`}><div key={index} className='hover:bg-zinc-700/70 hover:font-semibold cursor-pointer px-3 py-2 items-center gap-3 text-md w-52 rounded-lg flex'>
            <div>{data.icon}</div>
            <h1>{data.optionName}</h1>
        </div></Link>
        ))}
        </div>
        
  )
}

export default ThreePartButtons