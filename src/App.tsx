import React, { createContext, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Signup } from './pages/signup/signup';
import { SignIn } from './pages/signin/signin';
import { HomePage } from './pages/Homepage/homepage';
import { AdminHomepage } from './pages/Admin/meetup';
import { MeetupPage } from './pages/meetup/meetup';
import Dashboard from './components/Dashboard';
import { Header } from './components/Header';
import Memoise from './components/Memoise';

import './App.css';

import { RequiredAuth } from './utils/requiredAuth'; 

import { AuthReducer } from './reducers/auth-reducer';

export interface AuthContextInterface {
  user?: any,
  dispatch: (value: { type: string, payload?: any }) => void
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

const parseItem = (data: any) => {
  const storageUser = window.localStorage.getItem(data);
  const userObj = storageUser ? JSON.parse(storageUser) : null

  return userObj;
}

const initialState = {
  isAuthenticated: parseItem('isAuthenticated'),
  token: parseItem('token'),
  user: parseItem('user')
};

function App() {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/meetups/:id' element={<RequiredAuth><MeetupPage /></RequiredAuth>} />
        <Route path='/admin' element={<AdminHomepage />} />
        <Route path='/memo' element={<Memoise />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
