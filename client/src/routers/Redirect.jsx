import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useResultContext } from '../contexts/ResultContextProvider';



const Redirect = () => {
    const { checkShortLink, checkResult } = useResultContext()
    const location = useLocation()
    const shortLink = location.pathname.substring(1, location.pathname.length)
    const [countDown, setCountDown] = useState(5);

    useEffect(() => {
        if (shortLink) {
            checkShortLink(shortLink)
        }
    }, [])

    // countdown timer
    useEffect(() => {
        if(countDown > 0){
            const timer = setInterval(() => {
                setCountDown(countDown - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countDown]);
    
    useEffect(() => {
        if(countDown <= 0){
            if (checkResult.success) {
                window.location.href = checkResult.url
            }
        }
    }, [checkResult, countDown])

    return (
        <>
            Redirecting in {countDown} second...
        </>
    );
}

export default Redirect;