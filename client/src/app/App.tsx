import React from 'react';
import {Route, Routes} from "react-router-dom";
import './App.css';
import {Register} from "../components/Modal/Register";
import {Layout} from "./Layout";
import ClinicalCard from '../pages/ClinicalCard/ClinicalCard';

import {MainPage} from "../pages/MainPage/MainPage";
import {AuthProvider} from '../context';



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='/clinical' element={<ClinicalCard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
