import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

// Lazy Load Pages for Performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Plans = React.lazy(() => import('./pages/Plans'));
const Team = React.lazy(() => import('./pages/Team'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Recharge = React.lazy(() => import('./pages/Recharge'));
const Withdraw = React.lazy(() => import('./pages/Withdraw'));
const BankDetails = React.lazy(() => import('./pages/BankDetails'));
const Records = React.lazy(() => import('./pages/Records'));
const Admin = React.lazy(() => import('./pages/Admin'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={
          <div className="flex bg-slate-50 min-h-screen items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        }>
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
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
