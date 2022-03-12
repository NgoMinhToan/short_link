import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ResultContextProvider } from './contexts/ResultContextProvider'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <ResultContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ResultContextProvider>
    , document.getElementById('root')
)