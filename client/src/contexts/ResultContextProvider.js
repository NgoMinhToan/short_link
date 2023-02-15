import React, { useState, useContext, createContext } from 'react'

const ResultContext = createContext()
const baseUrl = process.env.REACT_APP_SHORTENER_API_URL + '/api' || 'http://localhost:5000/api'
// const baseUrl = '/api'

export const ResultContextProvider = ({ children }) => {
    const [checkResult, setCheckResult] = useState({});
    const [createResult, setCreateResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [shortLink, setShortLink] = useState('');
    const [keyListen, setKeyListen] = useState(false);
    const [url, setUrl] = useState('')

    const checkShortLink = async (shortLink) => {
        setIsLoading(true)
        const response = await fetch(`${baseUrl}/check?shortLink=${shortLink.toUpperCase()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        setCheckResult(data)
        setIsLoading(false)
    }
    const createShortLink = async (baseLink) => {
        setIsLoading(true)
        const response = await fetch(`${baseUrl}/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ baseLink, shortLink: shortLink.toUpperCase() })
        })
        const data = await response.json()
        setCreateResult(data)
        setIsLoading(false)
    }
    return (
        <ResultContext.Provider value={{ keyListen, setKeyListen, createShortLink, createResult, checkResult, isLoading, checkShortLink, shortLink, setShortLink, url, setUrl }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext)