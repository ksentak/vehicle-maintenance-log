import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { supabase } from '../supabase/client';

const Nav = ({ session }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link
          to='/'
          style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
        >
          <Typography variant='h6' component='div'>
            Maintenance Log
          </Typography>
        </Link>
        {session && (
          <>
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='inherit'>Dashboard</Button>
            </Link>
            <Link
              to='/profile'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button color='inherit'>Profile</Button>
            </Link>
            <Button color='inherit' onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
