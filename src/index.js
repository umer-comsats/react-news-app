import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import store from 'Store/store';

// styles for this kit
import "assets/css/bootstrap.min.css"
import "assets/scss/now-ui-kit.scss?v=1.5.0"
import "assets/demo/demo.css?v=1.5.0"
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0"
// pages for this kit
import LoginPage from "views/examples/LoginPage.js"
import LandingPage from "views/examples/LandingPage.js"
import SignUp from "views/examples/SignUp"
import Settings from "views/examples/SettingsPage"
import NewsSingle from "views/examples/SingleNewsPage"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/signup-page" element={<SignUp />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/news-single" element={<NewsSingle />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </Provider>,

);
