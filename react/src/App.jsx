import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import useUserStore from './store/useUserStore';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Setting from './pages/Setting';
import Admin from './pages/Admin';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Category from './pages/admin/Category';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
  `pk_test_51NMU3KSFP1rNAyoLoMlIK4tLGWWcdLJXYYVQIAIpjTh9DD65GsATflvp6ZljssCAiTkBAOGzOfmWEcvNEsK8Co6900gzQH9Xvw`
);

const App = () => {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch('/api/v1/user/me');
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    }

    fetchUser();
  }, [setUser]);

  if (loading) {
    return <Loader />;
  }

  location.pathname === '/admin'
    ? (document.title = 'Dashboard')
    : (document.title = 'Home');

  return (
    <QueryClientProvider client={queryClient}>
      <div className='container mx-auto'>
        {user && <Navbar />}
        <Routes>
          <Route
            path='/'
            element={user ? <Home /> : <Navigate to='/login' />}
          />
          <Route
            path='/admin'
            element={
              user && user.role === 'admin' ? (
                <Admin />
              ) : (
                <Navigate to='/login' />
              )
            }
          >
            <Route path='/admin' element={<Navigate to='/admin/products' />} />
            <Route path='products' element={<Products />} />
            <Route path='orders' element={<Orders />} />
            <Route path='category' element={<Category />} />
          </Route>
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route
            path='/checkout/payment'
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route
            path='/profile'
            element={user ? <Profile /> : <Navigate to='/login' />}
          />
          <Route
            path='/settings'
            element={user ? <Setting /> : <Navigate to='/login' />}
          />

          <Route
            path='/login'
            element={user ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='/signup'
            element={user ? <Navigate to='/' /> : <Signup />}
          />
        </Routes>
        <Toaster />
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
