import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { AllFormsProvider } from './contexts/UsersContext';


import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Router>
        <AllFormsProvider>
          <Switch>
            <Route exact path ="/" component={Home}/>
            <Route path="*" component={NotFound} />
          </Switch>
        </AllFormsProvider>
    </Router>
  );
}

export default App;
