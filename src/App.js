import './App.css';
import Head from './component/Layout/Head'
import Footer from './component/Layout/Footer'
import MenuLeft from './component/Layout/MenuLeft'

function App(props) {
  return (
    <>
      <Head />

      <section>
        <div className='container'>
          <div className='row'>
            <MenuLeft />
            {props.children}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
