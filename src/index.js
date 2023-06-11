import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from "react-router-dom";
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
  // uri: 'http://localhost:4000/',
  // uri: "https://scw-graphql-backe-end.herokuapp.com/",
  uri: "https://scw-task-backend.onrender.com/",
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>      
    </ApolloProvider>
  </React.StrictMode>
);


reportWebVitals();
