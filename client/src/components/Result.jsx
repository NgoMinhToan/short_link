import React, { useEffect, useState } from 'react'
import { useResultContext } from '../contexts/ResultContextProvider'
import { MdOutlineContentCopy } from 'react-icons/md'
const isValidHttpUrl = (string) => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

const Result = () => {
    const [newLink, setNewLink] = useState('');
    const { checkResult, createResult, shortLink, checkShortLink, url, setKeyListen } = useResultContext();
    const [errorShortLink, setErrorShortLink] = useState('');
    const [errorUrl, setErrorUrl] = useState('');
    const [disableButton, setDisableButton] = useState(true);
    const domain = `http://${window.location.host}`

    const handleCopyButton = () => {
        navigator.clipboard.writeText(newLink);
    }


    useEffect(() => {
        setErrorUrl('')
        setKeyListen(true)
        checkShortLink(shortLink)
        if(!isValidHttpUrl(url)){
            setErrorUrl('Please enter a valid url.')
            setKeyListen(false)
            setDisableButton(true)
        }
    }, [url])

    useEffect(() => {
        if(shortLink == ''){
            setErrorShortLink('Short url cannot be empty. Please try again.')
            setKeyListen(false)
            setDisableButton(true)
        }
        else{
            checkShortLink(shortLink)
        }
    },[shortLink])

    useEffect(() => {
        if(checkResult.success == true){
            setErrorShortLink('This short link is already taken. Please try another one.')
            setKeyListen(false)
            setDisableButton(true)
        }
        else if(checkResult.success == false){
            if(checkResult?.error){
                setErrorShortLink(checkResult?.error)
                setKeyListen(false)
                setDisableButton(true)
            }
            else{
                setNewLink(`${domain}/${shortLink}`)
                setErrorShortLink('')
                setKeyListen(true)
            }
        }
    },[checkResult])

    useEffect(() => {
        if(createResult.success == true){
            setDisableButton(false)
        }else{
            setErrorShortLink(createResult.error)
        }
    }, [createResult])

    return (
        <div className='relative'>
            <div className='relative mb-10'>
                <input 
                    className='
                        bg-blue-900 
                        bg-opacity-30 
                        rounded-full
                        px-3 py-1
                        hover:bg-opacity-50
                        transition-all 
                        ease-in-out 
                        duration-200'
                    disabled
                    value={newLink}
                />
                <button
                    className='
                        absolute 
                        -right-10
                        top-0 p-2 
                        bg-blue-900 
                        bg-opacity-30 
                        rounded-full
                        hover:bg-blue-900
                        hover:disabled:bg-opacity-10
                        disabled:bg-opacity-10
                        disabled:text-gray-500
                        transition-all 
                        ease-in-out 
                        duration-200'
                    disabled={disableButton}
                    onClick={() => handleCopyButton()}
                >
                    <MdOutlineContentCopy />
                </button>
            </div>
            <div className='absolute'>
                <p className='text-red-900 font-bold text-sm'>{errorUrl && `- ${errorUrl}`}</p>
                <p className='text-red-900 font-bold text-sm'>{errorShortLink && `- ${errorShortLink}`}</p>
            </div>
        </div>
        
    )
}

export default Result