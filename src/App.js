import './App.css';
import Navbar from './components/Navbar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route,Routes, Outlet} from 'react-router';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from "./pages/ForgotPassword"
import { ChooseNewPass } from './pages/ChooseNewPass';
import { VerifyEmail } from './pages/VerifyEmail';
import { CategoryPage } from "./pages/CategoryPage";
import { CoursePage } from './pages/CoursePage'
import { catagories } from './data/tempData';
import { Dashboard } from './components/dashboardPages/Dashboard';
function App() {
  return (
    <div className='bg-richblack-900 overflow-hidden min-h-screen'>
      <Navbar/>
      <div className=''>
      <Routes>
        <Route path='/' element={<div><Outlet/></div>}>
          <Route index element={<Home/>}/>
          <Route path="/dashboard/*" element={<Dashboard/>}/>
          <Route path="/login" element = {<LogIn/>}/>
          <Route path="/signUp" element = {<SignUp/>}/>
          <Route path="/about_Us" element = {<AboutUs/>} />
          <Route path="/contact_Us" element = {<ContactUs/>}/>
          <Route path="/forgot_password" element = {<ForgotPassword/>}/>
          <Route path="/newPass" element={<ChooseNewPass/>}/>
          <Route path='/verifyEmail' element={<VerifyEmail/>}/>
          {catagories.map((catagory,i)=>{
            return <Route key={i} path={`/catalog/${catagory}`} element={<CategoryPage/>}/>
          })}
          <Route path={`/cources/*`} element={<CoursePage/>}/>
          <Route path='*' element = {<div className='text-white'>invalid path</div>}/>
        </Route>
      </Routes>
      </div>
    </div>
    
  )
};
export default App;
