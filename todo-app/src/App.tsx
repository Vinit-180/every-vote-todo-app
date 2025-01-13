import './App.css'
import Navbar from './components/Navbar'
import { ThemeProvider } from './components/Theme-Provider'
import Home from './pages/Home/Home'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <Navbar/>
    <Home/>
    </ThemeProvider>
  )
}

export default App
