import Navbar from './components/Navbar';
import { Route,Routes, Outlet} from 'react-router';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from "./pages/ForgotPassword"
import { ChooseNewPass } from './pages/ChooseNewPass';
import { VerifyEmail } from './pages/VerifyEmail';
import { CategoryPage } from './pages/CategoryPage';
import { CoursePage } from './pages/CoursePage'
import { Dashboard } from './components/dashboardPages/Dashboard';
import { ViewCourse } from './components/viewCourse/ViewCourse';
import { LoadingScreen } from './components/LoadingScreen';
import { useSelector } from 'react-redux';
// import 'vite/modulepreload-polyfill'
import { useEffect } from 'react';
function App() {
  useEffect(()=>{
    document.title = "StudyNotion"
  })
  const isLoading = useSelector(({rootReducer})=>{
    return rootReducer.UI_slice.loading;
  });
  return (
    <div className='bg-richblack-900 overflow-x-hidden h-screen min-h-screen hideScrollBars '>
      <Navbar/>
      <div className='h-[100%]'>
        {isLoading?<LoadingScreen/>:
        <Routes>
          <Route path='/' element={<div className='h-[100%]'><Outlet/></div>}>
            <Route index element={<Home/>}/>
            <Route path="/dashboard/*" element={<Dashboard/>}/>
            <Route path="/login" element = {<LogIn/>}/>
            <Route path="/signUp" element = {<SignUp/>}/>
            <Route path="/about_Us" element = {<AboutUs/>} />
            <Route path="/contact_Us" element = {<ContactUs/>}/>
            <Route path="/forgotPassword" element = {<ForgotPassword/>}/>
            <Route path="/newPassword/*" element={<ChooseNewPass/>}/>
            <Route path='/verifyEmail' element={<VerifyEmail/>}/>
            <Route path={`/catalog/*`} element={<CategoryPage/>}/>
            <Route path={`/cources/*`} element={<CoursePage/>}/>
            <Route path={`/view-course/*`} element={<ViewCourse/>}/>
            <Route path='*' element = {<div className='text-white'>invalid path</div>}/>
          </Route>
        </Routes>
        }
      </div>
    </div>
    
  )
}
export default App;
