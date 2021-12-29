import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap'
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';



const App =() => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
<Route path='/' element={ <HomePage/>} /> 
<Route path='/products/:id' element={ <ProductPage/>}/> 
          </Routes>
          
        </Container>
        </main>
      
      <Footer/>
    </Router>
  )
}

export default App
