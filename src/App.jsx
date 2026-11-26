import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MobileBar from './components/MobileBar.jsx';
import Toast from './components/Toast.jsx';
import Cursor from './components/Cursor.jsx';
import Curtain from './components/Curtain.jsx';
import Home from './pages/Home.jsx';

const OurStory = lazy(() => import('./pages/OurStory.jsx'));
const Products = lazy(() => import('./pages/Products.jsx'));
const Farmers = lazy(() => import('./pages/Farmers.jsx'));
const FarmerProfile = lazy(() => import('./pages/FarmerProfile.jsx'));
const HowItWorks = lazy(() => import('./pages/HowItWorks.jsx'));
const Recipes = lazy(() => import('./pages/Recipes.jsx'));
const RecipeDetail = lazy(() => import('./pages/RecipeDetail.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Brand = lazy(() => import('./pages/Brand.jsx'));
const BrandPrint = lazy(() => import('./pages/BrandPrint.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  // the printable brand guide renders without the site chrome
  if (pathname === '/brand/print') return <Suspense fallback={null}><BrandPrint /></Suspense>;
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main" key={pathname} className="page" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" aria-label="Loading" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/products" element={<Products />} />
            <Route path="/farmers" element={<Farmers />} />
            <Route path="/farmers/:id" element={<FarmerProfile />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileBar />
      <Toast />
      <Curtain />
      <Cursor />
    </>
  );
}
