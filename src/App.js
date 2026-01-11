import './App.css';
import Head from './component/Layout/Head'
import Footer from './component/Layout/Footer'
import MenuLeft from './component/Layout/MenuLeft'
import { Outlet, useLocation } from 'react-router-dom';
import MenuAcc from './component/Member/MenuAcc';

function App(props) {
  let params1 = useLocation();
  return (
    <>
      <Head />

      <section>
        <div className='container'>
          <div className='row'>
            {
              params1['pathname'].includes("account") ? <MenuAcc /> : <MenuLeft />
            }
            {props.children}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
