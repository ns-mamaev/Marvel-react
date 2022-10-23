import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/spinner';

const PageNotFound = React.lazy(() => import('../pages/NoFound'));
const MainPage = React.lazy(() => import('../pages/MainPage'));
const ComicsPage = React.lazy(() => import('../pages/ComicsPage'));
const SingleComic = React.lazy(() => import('../pages/SingleComis'));

const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <React.Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/comics/:comicsId" element={<SingleComic />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes> 
          </React.Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
