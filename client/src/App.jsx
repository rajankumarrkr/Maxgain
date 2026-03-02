import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Plans from './pages/Plans';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Recharge from './pages/Recharge';
import Withdraw from './pages/Withdraw';
import BankDetails from './pages/BankDetails';
import Records from './pages/Records';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="plans" element={<Plans />} />
            <Route path="team" element={<Team />} />
            <Route path="profile" element={<Profile />} />
            <Route path="recharge" element={<Recharge />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="bank-details" element={<BankDetails />} />
            <Route path="income-record" element={<Records type="income" />} />
            <Route path="withdrawals" element={<Records type="withdrawal" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
