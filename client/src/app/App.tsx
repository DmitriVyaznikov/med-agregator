//@ts-nocheck
import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { Layout } from "./Layout";
import ClinicalCard from '../pages/ClinicalCard/ClinicalCard';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

import { MainPage } from "../pages/MainPage/MainPage";
import { AuthProvider } from '../context';
import { useSelector } from "react-redux";
import { store } from './../redux'
import { IGeneralState, IUser, Types } from "../redux/types/types";
import { ProfileEditing } from '../components/ProfileEditing';

function App() {

  useEffect(() => {
    fetch('/main/alldataquery')
      .then(response => response.json())
      .then(data => [...data.readyClinicList, ...data.readyDoctorList])
      .then(data => dispatch({ type: Types.ADD_CLINICS_AND_DOCTORS_SUCCESS, payload: data }))
      .catch(error => {
        console.error(error);
      })
  }, [])

  const user = useSelector(state => state.login.user.id);
  console.log(!!user);

  return (
    <AuthProvider>
      {!user 
      ?
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
      :
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/clients' element={<h1>Страница клиентов</h1>} />
        <Route path='/doctors' element={<h1>Страница врачей</h1>}></Route>
        <Route path='/calendar' element={<h1>Календарь</h1>} />
        <Route path='/profileEditing' element={<ProfileEditing />} />
        <Route path='/clinical' element={<ClinicalCard />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
      }
    </AuthProvider>
  );
}

export default App;
