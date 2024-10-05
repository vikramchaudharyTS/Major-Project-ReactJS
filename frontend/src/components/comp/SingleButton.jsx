import React from 'react'
import { Link } from 'react-router-dom'


function SingleButton({ data }) {

        return (
          <Link to={`${data.to}`}>
            <div className={`px-3 py-2 items-center gap-3 text-md w-52 rounded-lg flex cursor-pointer hover:bg-zinc-700/70 hover:font-semibold`} >
              <div>{data.icon}</div>
              <h1>{data.optionName}</h1>
            </div>
          </Link>
        );
    }

export default SingleButton;
