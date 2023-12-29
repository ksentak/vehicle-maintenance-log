import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import Nav from './components/Nav';
// Pages
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
// Utils
import { supabase } from './supabase/client';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <Nav session={session} />
      <div className='container' style={{ padding: '50px 0 100px 0' }}>
        <Routes>
          <Route path='/' element={!session ? <Auth /> : <Dashboard />} />
          <Route path='/profile' element={<Profile session={session} />} />{' '}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
