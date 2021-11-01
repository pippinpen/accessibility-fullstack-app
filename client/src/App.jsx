import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { Auth0Provider } from '@auth0/auth0-react';
import { UIProvider } from './contexts/ui.context';
import { BasketProvider } from './contexts/basket.context';
import { FormTypesProvider } from './contexts/formtypes.context';
import { UsersProvider } from './contexts/users.context';

// CSS
import './App.css';

// PAGES
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import MakeEvent from './pages/MakeEvent/MakeEvent';
import Event from './pages/Event/Event';
import EventResponses from './pages/EventResponses/EventResponses';
import Resources from './pages/Resources/Resources';
import Help from './pages/Help/Help';
import NotFound from './pages/NotFound/NotFound';

// COMPONENTS
import Auth0Wrapper from './components/Auth0Wrapper/Auth0Wrapper';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { FormTypePermission, UsersPermission } from './constants';

import history from './utils/history';
import { getConfig } from './config';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname,
  );
};

const config = getConfig();
const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  onRedirectCallback,
};

function App() {
  return (
    <Router>
      <Auth0Provider {...providerConfig}>
        <ToastProvider autoDismiss={true}>
          <UIProvider>
            <ProductsProvider>
              <OrdersProvider>
                <BasketProvider>
                  <Auth0Wrapper>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <ProtectedRoute
                        permissions={[UserPermission.CreateUsers]}
                        path="/signup"
                        component={SignUp}
                      />
                      <ProtectedRoute
                        permissions={[UserPermission.UpdateUsers]}
                        path="/users/update/:id"
                        component={UpdateUser}
                      />
                      <ProtectedRoute path="/dashboard" component={Dashboard} />
                      <ProtectedRoute path="/event/:id" component={Event} />
                      <ProtectedRoute path="/event/new" component={MakeEvent} />
                      <ProtectedRoute path="/event/responses/:id" component={EventResponses} />
                      <ProtectedRoute path="/help" component={Help} />
                      <ProtectedRoute path="/resources" component={Resources} />
                      <Route path="*" component={NotFound} />
                    </Switch>
                  </Auth0Wrapper>
                </BasketProvider>
              </OrdersProvider>
            </ProductsProvider>
          </UIProvider>
        </ToastProvider>
      </Auth0Provider>
    </Router>
  );
}

export default App;
