import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AddCarPage } from './pages/add-car-page';
import { DisplayCarPage } from './pages/display-car-page';
import { HomePage } from './pages/home-page';
import { UpdateCarPage } from './pages/update-car-page';

const queryClient = new QueryClient();

function App() {
  return( 
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomePage/>}/>
        <Route path={'/car'} element={<AddCarPage/>}/>
        <Route path={'/cars/:carid'} element={<DisplayCarPage/>}/>
        <Route path={'/car/:carid'} element={<UpdateCarPage/>}/>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
  );
}

export default App;
