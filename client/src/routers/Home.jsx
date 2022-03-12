import React from 'react';
import Input from '../components/Input';
import Result from '../components/Result';

const Home = () => {
    return (
        <>
            <div className='mt-10 w-5/6 md:w-2/3 lg:w-3/5'>
                <Input />
            </div>
            <div className='mt-10 w-5/6 md:w-2/3 lg:w-3/5'>
                <Result />
            </div>
        </>
    );
}

export default Home;