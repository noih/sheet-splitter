import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './MainPage';

class PagesRoot extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path="*" element={<MainPage context={this.context} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default PagesRoot;
