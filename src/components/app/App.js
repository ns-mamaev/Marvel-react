import AppHeader from '../appHeader/AppHeader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';

const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route path="/comics">
              <ComicsPage />
            </Route>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>  
        </main>
      </div>
    </Router>
  );
}

export default App;
