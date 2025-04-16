import { Route, Routes } from 'react-router-dom'
import NewsletterWebsite from './components/First.jsx'
import NewsPage from './components/NewsPage.jsx';

export default function ExpenseTracker() {
  return (
    <>
    
    <Routes>
        <Route path="/" element={<NewsletterWebsite/>} /> 
        <Route path="/news/:id" element={<NewsPage />} />
      </Routes>
    </>
  );
}
