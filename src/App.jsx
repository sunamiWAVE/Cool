import { Route, Routes } from 'react-router-dom'
import NewsletterWebsite from './components/First.jsx'
import NewsPage from './components/NewsPage.jsx';
import SearchPage from './components/Search.jsx';

export default function ExpenseTracker() {
  return (
    <>
    
    <Routes>
        <Route path="/" element={<NewsletterWebsite/>} /> 
        <Route path="/news/:id" element={<NewsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
}
