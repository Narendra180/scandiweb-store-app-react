import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import store from './redux/store';
import { Provider } from 'react-redux'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>      
    </ApolloProvider>
  </React.StrictMode>
);


reportWebVitals();
