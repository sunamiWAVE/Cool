import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Tracker from './components/Tracker';

export default function ExpenseTracker() {
  return (
    <>
    
    <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/Tracker" element={<Tracker/>} /> 
      </Routes>
    </>
  );
}
