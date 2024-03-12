import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/NavBar';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import UserDetails from './pages/User/UserDetails';
import UserProfile from './pages/User/UserProfile';
import CreateGoal from './pages/Goals/CreateGoal';
import DisplayGoal from './pages/Goals/DisplayGoal';
import Copyright from './components/Copyright';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/create-goal" element={<CreateGoal />} />
          <Route path="/display-goal" element={<DisplayGoal />} />
          <Route path="/" element={<Login />} />
        </Routes>
        <Copyright sx={{ mt: 5 }} />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

