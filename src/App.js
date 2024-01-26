// import env from "react-dotenv";
import { NavLink, Navigate, useNavigate, Route, Routes } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Games from './Games';
import LogIn from './logIn';
import Profile from './profile';
import GameForm from './GameForm';
import LogInForm from './LogInForm';
import logo from './Randomizer.png';
import SignUp from './SignUp';
import GameInfo from './GameInfo';
import User from './User';




function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false)
const navigate = useNavigate();

const logOut = () => {
  console.log("logging out")  
  localStorage.removeItem("userData")
  setIsLoggedIn(false)
  navigate("/")
}

const logIn = (email, password) => {
  console.log("logging in")
  fetch('http://git.heroku.com/whatshouldiplaybackend/users/login', {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => {
            res.json().then((data) => {
                console.log(data)
                localStorage.setItem('userData', JSON.stringify({ userId: data.id, token: data.token, userData: data }))
                
            })
            // navigate('/profile')
            setIsLoggedIn(true)
            navigate('/games')
        })
}


  useEffect(() => {
    const localStorData = JSON.parse(localStorage.getItem("userData"))
    if (localStorData) {
      setIsLoggedIn(true)
      navigate('/profile')
    }
  },[isLoggedIn])

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/games" element={<Games />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newGame" element={<GameForm />} />
        <Route path="/game/:id" element={<GameInfo />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<Navigate to ="/" replace/>} />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<LogIn />} />

        <Route path="/logIn" element={<LogInForm logIn={logIn} />} />
        <Route path="/signUp" element={<SignUp /> } />
        <Route path="*" element={<Navigate to ="/" replace/>} />
      </Routes>
    )
  }
  return (
    <div className="App">
      <header>
        <img className='logo' src={logo} alt="logo"></img>
        <h1>What should I play?</h1>
        <img className='logo' src={logo} alt='logo'></img>
      </header>
      <nav className="navbar">
        {isLoggedIn? (
          <>
          <NavLink activeclassname="active" to="/games"><h3 className="text-link">User Profiles</h3></NavLink>
          <NavLink activeclassname="active" to="/profile"><h3 className="text-link">Profile</h3></NavLink>
          <button onClick={logOut}><h3 className="text-link">Sign Out</h3></button>
          </>
        ): (
          <NavLink activeclassname="active" to="/"><h3 className="text-link">Sign In/Up</h3></NavLink>
        )}
      </nav>
        <main>
          {routes}
        </main>
      <footer className='footer'>
        <p>App created by Ryan Sammer</p>
      </footer>
    </div>
  );
}

export default App;

