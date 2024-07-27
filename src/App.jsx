
import './App.css'
import Header from './components/Header'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ViewCreator from './pages/ViewCreator';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ShowOneCreator from './pages/ShowOneCreator';



function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route element={<ViewCreator/>} path='/'/>
        <Route element={<AddCreator/>} path='/addcreator'/>
        <Route element={<EditCreator/>} path='/edit/:creatorId'/>
        <Route element={<ShowOneCreator/>} path='/:creatorId'/>
      </Routes>

    </BrowserRouter>
  )
}

export default App
