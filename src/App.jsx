import { useState } from 'react'

import Header from './components/Header'
import Featured from './components/Featured'
import Popular from './components/Popular'
import Watchlist from './components/Watchlist'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <Featured />
    <Popular />
    <Watchlist />
    </>
  )
}

export default App
