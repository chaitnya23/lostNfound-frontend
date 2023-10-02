import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import { signInWithGoogle } from './resources/firebase';
import { useContext,useState } from 'react';
import { AppContext } from './context/app-context';
import ItemSlide from './components/item-slide';
import Info from './components/info';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LostItemsPage from './pages/lost-items';
import LostItemRegisterPage from './pages/lost-item-register';
import LoginPopup from './components/login-popup';
import AboutPage from './pages/about';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FoundItemRegisterPage from './pages/found-item-register';
import FoundItemsPage from './pages/found-items';
import Feedback from './pages/feedback';


function App() {
  const { setuser, enableLoginPopup } = useContext(AppContext);

  //for mobile web view
  const [openSideBar, setopenSideBar] = useState(false);

  return (
    <div className="App">

      <LoginPopup />
      <div className='md:flex'>
        <Sidebar openSideBar={openSideBar} setopenSideBar={setopenSideBar}/>

        <div className='w-full'>
          <Navbar setopenSideBar={setopenSideBar} />

          <Routes>
            <Route path="/" exact element={<AboutPage />} />
            <Route path="/lost-items" exact element={<LostItemsPage />} />
            <Route path="/found-items" exact element={<FoundItemsPage />} />
            <Route path="/lost-item-register" exact element={<LostItemRegisterPage />} />
            <Route path="/found-item-register" exact element={<FoundItemRegisterPage />} />
            <Route path="/feedback" exact element={<Feedback />} />

          </Routes>
        </div>
      </div>

      <ToastContainer />

    </div>
  );
}

export default App;
