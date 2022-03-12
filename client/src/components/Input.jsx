import React, { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useResultContext } from '../contexts/ResultContextProvider'
import useKeyPress from '../hooks/useKeyPress'
import { IoReloadCircle } from 'react-icons/io5'
import { BiTransfer } from 'react-icons/bi'

const randomLink = (num) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < num; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const Input = () => {
  const [textShortLink, setTextShortLink] = useState(randomLink(6));
  const [textUrl, setTextUrl] = useState('');
  const [shortLinkDebounced] = useDebounce(textShortLink, 500);
  const [urlDebounced] = useDebounce(textUrl, 500);
  const { setShortLink, url, setUrl, createShortLink, createResult, setKeyListen, keyListen } = useResultContext();
  const [disableButton, setDisableButton] = useState(true);
  const enterPress = useKeyPress('Enter');

  useEffect(() => {
    if(shortLinkDebounced) setShortLink(shortLinkDebounced);
    if(urlDebounced) setUrl(urlDebounced);
  }, [shortLinkDebounced, urlDebounced]);

  useEffect(() => {
    if(textShortLink == '') setShortLink('')
  }, [textShortLink])

  useEffect(() => {
    if(createResult.success == true){
      // setUrl('')
      // setNewShortLink(randomLink(6))
      setKeyListen(false)
    }
  },[createResult])

  // listen on enter key
  useEffect(() => {
    if(enterPress === true){
      if(keyListen){
        createShortLink(url);
      }
    }
  },[enterPress])

  useEffect(() => {
    setDisableButton(!keyListen)
  }, [keyListen])

  return (
    <div className='flex flex-col jusify-space-between w-full'>
      <div className='relative mb-10 w-full'>
        <input 
          id='url' 
          type="text" 
          placeholder='Paste your link here !' 
          value={textUrl} 
          onChange={(e) => setTextUrl(e.target.value)} 
          className='
            w-full
            p-5 
            bg-blue-900 
            bg-opacity-30 
            rounded-full 
            outline-0 
            peer 
            placeholder-transparent'
        />
        <label 
          htmlFor='url' 
          className='
            absolute 
            -top-3 
            left-5 
            text-sm
            peer-placeholder-shown:text-base
            peer-placeholder-shown:top-5
            peer-placeholder-shown:text-gray-400
            transition-all
            peer-focus:left-5 
            peer-focus:-top-3
            peer-focus:text-sm
            peer-focus:text-white
          '>
          Paste your link here !
        </label>
      </div>
      <div className='relative w-full'>
        <input 
          id='shorkLink' 
          type="text" 
          placeholder='Your cusstom link !' 
          value={textShortLink} 
          onChange={(e) => setTextShortLink(e.target.value)} 
          className='
            w-full
            p-5 
            bg-blue-900 
            bg-opacity-30 
            rounded-full 
            outline-0 
            peer 
            placeholder-transparent'
        />
        <label 
          htmlFor='shorkLink' 
          className='
            absolute 
            -top-3 
            left-5 
            text-sm
            peer-placeholder-shown:text-base
            peer-placeholder-shown:top-5
            peer-placeholder-shown:text-gray-400
            transition-all
            peer-focus:left-5 
            peer-focus:-top-3
            peer-focus:text-sm
            peer-focus:text-white
          '>
          Your cusstom link !
        </label>
        <button onClick={() => setTextShortLink(randomLink(6))} className='bg-blue-900 absolute right-4 top-3.5 bg-opacity-80 rounded-full outline-0'><IoReloadCircle className='hover:rotate-90 transition-all ease-in-out' size={35}/></button>
      </div>
      <div className='self-center mt-8'>
        <button
          className='
            px-3 py-1 
            bg-blue-800 
            bg-opacity-30 
            rounded-full outline-0
            hover:bg-blue-800
            hover:disabled:bg-opacity-10
            disabled:bg-opacity-10
            disabled:text-gray-500
            transition-all 
            ease-in-out 
            duration-200'
          disabled={disableButton}
          onClick={() => createShortLink(url)}
        >
          <BiTransfer size={30}/>
        </button>
      </div>
    </div>
  )
}

export default Input