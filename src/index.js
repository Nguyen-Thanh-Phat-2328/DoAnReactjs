import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Index from './component/Blog/Index';
import Detail from './component/Blog/Detail';
import IndexMember from './component/Member/IndexMember';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/blog/list' element={<Index />} />
          <Route path='/blog/detail/:id' element={<Detail />} />
          <Route path='/member/login-register' element={<IndexMember />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
