import React from 'react';

const Button = ({ onClick, label, className, type, dataCy  }) => {
    const buttonClasses = `px-10 p-3 bg-indigo-700 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-900 md:w-auto ${className}`;

    return (
        <button data-cy={dataCy} type={type} onClick={onClick} className={buttonClasses}>
            {label}
        </button>
    );
};

export default Button;