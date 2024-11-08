import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Form from './Components/BookForm.jsx';
import reportWebVitals from './reportWebVitals';
import BookDetails from './Components/BookDetail.jsx';
import Sidebar from './Components/Sidebar';
import UpdateBookForm from './Components/BookUpdate.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div className="flex">
        <Sidebar /> 
        <div className="ml-64 flex-1 p-6">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/form" element={<Form />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/update/:id" element={<UpdateBookForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
