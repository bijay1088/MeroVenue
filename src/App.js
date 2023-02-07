import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import NavBar from "./components/NavBar"
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from "./components/Login"
import Home from "./components/home"
import Contact from "./components/contact"
import About from "./components/about"
import Footer from "./components/footer"
import ToDo from "./components/ToDoList"


function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Contact />} />
                </Routes>
                <ToDo />
                <Footer />
            </BrowserRouter>

        </>
    );
}


export default App

