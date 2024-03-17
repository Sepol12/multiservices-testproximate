import React from 'react';
import './App.css';
import { LoginForm, Dashboard, ProductDetail, Sidebar, TopBar, Footer } from './components'; // Asegúrate de importar el componente NotFound si ya lo tienes creado
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && (
        <>
          <TopBar />
          <Sidebar />
        </>
      )}
      <Routes>
        {/* Rutas */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:productPath" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
