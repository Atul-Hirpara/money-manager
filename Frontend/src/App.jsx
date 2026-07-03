
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Category from "./pages/Category"
import Income from "./pages/Income"
import Expense from "./pages/Expense"
import Filter from "./pages/Filter"
import Login from "./pages/Login"

function App() {
 
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category" element={<Category />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
      
    
  )
}

export default App