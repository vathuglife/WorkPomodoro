
import './App.css'
import LoginPage from './Pages/Login/LoginPage'
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import CountdownPage from './Pages/Countdown/CountdownPage'
import RegisterPage from './Pages/Register/RegisterPage'

function App() { 
  return (
    
    <BrowserRouter>      
      
        <Routes>
          <Route path='/' element={<LoginPage/>}></Route>  
          <Route path='/register' element={<RegisterPage/>}></Route>  
          <Route path='/countdown' element={<CountdownPage/>}></Route>  
        </Routes>        
    
    </BrowserRouter>    
  )
}

export default App
