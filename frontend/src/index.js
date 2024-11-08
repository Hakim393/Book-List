import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Form from "./Components/BookForm.jsx";
import BookDetails from "./Components/BookDetail.jsx";
import Sidebar from "./Components/Sidebar";
import UpdateBookForm from "./Components/BookUpdate.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar dengan z-10 untuk tampil di atas konten */}
        <Sidebar className="md:w-64 w-full md:fixed md:h-full z-10" />

        {/* Konten Utama dengan margin responsif */}
        <div className="md:ml-64 flex-1 p-4 md:p-6">
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
