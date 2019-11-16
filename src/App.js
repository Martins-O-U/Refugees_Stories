import React from 'react';
import store from './state/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './styles/theme.styles';
import { GlobalStyles } from './styles/global.styles';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import WebsiteRouter from './components/Router/WebsiteRouter';
import OnboardingRouter from './components/Router/OnboardingRouter';
import DashboardRouter from './components/Router/DashboardRouter';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />

            <WebsiteRouter />
            <OnboardingRouter />
            <DashboardRouter />
  
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
