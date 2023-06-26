import './App.css'
import AddYourself from './components/AddYourself'
import GetYourDetails from './components/GetYourDetails'
import Index from './components/Index'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from './components/Sidebar'


function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/app" element={<Sidebar />} />
          <Route path="/add" element={<AddYourself />} />
          <Route path="/verify" element={<GetYourDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
