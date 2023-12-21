import { Route, Routes } from 'react-router-dom'
import logoLoad from './assets/logoLoad.json';
import Lottie from 'lottie-react';

import Header from './components/Header'
import Home from './pages/Home'
import Details from './pages/Details'
import Results from './pages/Results'


function App() {

  return (
    <>


      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
        <Route path="/search">
          <Route index element={<Results />} />
          <Route path=":id" element={<Results />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
