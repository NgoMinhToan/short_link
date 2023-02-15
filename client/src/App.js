import React, { useEffect } from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './routers/Home'
import Redirect from './routers/Redirect'
import Page404 from './routers/Page404'

const App = () => {
    return (
        <div className='dark'>
            <div className='bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen min-w-screen'>
                <div className='flex flex-wrap justify-center items-center h-screen w-screen flex-col'>
                    <div>
                        <h1 className='text-6xl uppercase font-bold'>Shorten Link</h1>
                    </div>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/:shortLink' element={<Redirect />} />
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;