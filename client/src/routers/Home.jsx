import React from 'react';
import Input from '../components/Input';
import Result from '../components/Result';

const Home = () => {
    return (
        <>
            <div className='mt-10'>
                <Input />
            </div>
            <div className='mt-10'>
                <Result />
            </div>
        </>
    );
}

export default Home;