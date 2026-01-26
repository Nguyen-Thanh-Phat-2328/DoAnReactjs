import './App.css';
import Head from './component/Layout/Head'
import Footer from './component/Layout/Footer'
import MenuLeft from './component/Layout/MenuLeft'
import { Outlet, useLocation } from 'react-router-dom';
import MenuAcc from './component/Member/MenuAcc';
import { UserContext } from './UserContext';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function App(props) {
  let params1 = useLocation();
  const [getToTalCart, setToTalCart] = useState(0);

  const cartRedux = useSelector(state => state.cart.cart);

  useEffect(() => {
    localStorage.setItem('cartRedux', JSON.stringify(cartRedux)); 
  }, [cartRedux]);
  return (
    <UserContext.Provider value={{ getToTalCart, setToTalCart }}>
      <Head />

      <section>
        <div className='container'>
          <div className='row'>
            {
              params1['pathname'].includes("account") ? <MenuAcc /> : params1['pathname'].includes("cart") ? '' : <MenuLeft />
            }
            {props.children}
          </div>
        </div>
      </section>

      <Footer />
    </UserContext.Provider>
  );
}

export default App;
