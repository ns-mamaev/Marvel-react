import AppHeader from '../appHeader/AppHeader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';
import PageNotFound from '../pages/NoFound';

const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>  
        </main>
      </div>
    </Router>
  );
}

export default App;
