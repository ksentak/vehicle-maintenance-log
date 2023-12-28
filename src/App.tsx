import { useState, useEffect } from 'react';
import { supabase } from './supabase/client';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

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
    <div className='container' style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Dashboard key={session.user.id} session={session} />
      )}
    </div>
  );
};

export default App;
