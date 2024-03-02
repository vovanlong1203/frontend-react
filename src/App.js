import { Container } from 'react-bootstrap';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <Router>
      <Header />
        <main className='py-5'>
          <Container>

            <Routes>
              <Route path='/' element={<HomeScreen />} exact />
            </Routes>
            <Routes>
              <Route path='/login' element={<LoginScreen />} />
            </Routes>

            <Routes>
            <Route path='/products/:id' element={<ProductScreen />} />
            </Routes>
            <Routes>
            <Route path='/cart/:id?' element={<CartScreen />} />
            </Routes>

          </Container>
        </main>
      <Footer />  
    </Router>
  );
}

export default App;
