import React from 'react';

function SingleButton({ data, customClasses, onClick }) {
    const { color, heading, icon, hoverColor } = data;

    return (
        <button
            className={`px-3 py-2 items-center justify-center gap-3 text-md w-52 rounded-lg flex cursor-pointer ${color} ${hoverColor} hover:font-semibold ${customClasses}`}
            onClick={onClick}  // Apply the onClick handler to the button
        >
            <div>{icon}</div>
            {heading} {/* Display the correct button text */}
        </button>
    );
}

export default SingleButton;
