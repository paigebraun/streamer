import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Details from './pages/Details'
import Results from './pages/Results'
import Login from './pages/Login'
import SignUp from './pages/SignUp'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
        <Route path="/search">
          <Route index element={<Results />} />
          <Route path=":id" element={<Results />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
