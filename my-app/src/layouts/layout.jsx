import React from 'react';
import Sidebar from '../components/sidebar/sidebar';



export default function Layout(props) {
    return (
        <div className='layout'>
            
            <Sidebar />
            {props.children}
        </div>
    )
}
