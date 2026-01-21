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
import Account from './component/Member/Account';
import AppNoMenuLeft from './AppNoMenuLeft';
import Product from './component/Member/Product';
import AddProduct from './component/Member/AddProduct';
import UpdateProduct from './component/Member/UpdateProduct';
import ProductDetail from './ProductDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path='/blog/list' element={<Index />} />
          <Route path='/blog/detail/:id' element={<Detail />} />
          <Route index path='/' element={<Home />} />
          <Route path='/login' element={<IndexMember />} />
          <Route path='/account' element={<Account />} />
          <Route path='/account/product' element={<Product />} />
          <Route path='/account/addproduct' element={<AddProduct />} />
          <Route path='/account/updateproduct/:id' element={<UpdateProduct />} />
          <Route path='/product/detail/:id' element={<ProductDetail />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route element={<App />}>
//           <Route path='/blog/list' element={<Index />} />
//           <Route path='/blog/detail/:id' element={<Detail />} />
//         </Route>

//         <Route element={<AppNoMenuLeft />}>
//           <Route index path='/' element={<Home />} />
//           <Route path='/login' element={<IndexMember />} />
//           <Route path='/account' element={<Account />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
