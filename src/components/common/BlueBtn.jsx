import React from 'react';
import { Link } from 'react-router-dom';

function BlueBtn({ to, label }) {
    return (
        <div className="flex justify-center items-center">
            <Link to={to}>
                <button
                    type="button"
                    className="text-blue-500 bg-white rounded-[20px] border border-blue-500 px-5 py-2"
                >
                    {label}
                </button>
            </Link>
        </div>
    );
}

export default BlueBtn;
