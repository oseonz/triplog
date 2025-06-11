import { createRoot } from 'react-dom/client';
// import "./styles/fonts.css";
import './index.css';
import './assets/css/index.css';
import App from './App.jsx';
import { RecoilRoot } from 'recoil';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
);
