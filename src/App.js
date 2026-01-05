import './App.css';
import Head from './component/Layout/Head'
import Footer from './component/Layout/Footer'
import MenuLeft from './component/Layout/MenuLeft'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Head />

      <section>
        <div className='container'>
          <div className='row'>
            <MenuLeft />
            <Outlet />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
