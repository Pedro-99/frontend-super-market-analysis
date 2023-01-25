import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Sidebar() {
    return (

        <nav>
            <div className='link'>
                <Link to={"/about"}>About</Link>
            </div>
            <div className='link'>
                <Link to={"/create"}>Upload</Link>
            </div>
            {/* <div className='link'>
                <Link to={"/salles"}>Salles</Link>
            </div> */}
            <div className='link'>
                <Link to={"/charts"}>Charts</Link>
            </div>
        </nav>

    )
}
