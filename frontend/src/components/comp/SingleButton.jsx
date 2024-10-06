import React from 'react'


function SingleButton({data}) {
    const {color, heading, icon, hoverColor} = data
    return (
        <div className={`px-3 py-2 items-center justify-center gap-3 text-md w-52 rounded-lg flex cursor-pointer ${color} ${hoverColor}  hover:font-semibold`}>
          <div>{icon}</div>
          <button className=''>{heading}</button>
        </div>
      );
}

export default SingleButton