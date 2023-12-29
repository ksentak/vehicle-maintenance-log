import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { supabase } from '../supabase/client';

const Nav = ({ session }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Vehicle Maintenance Log
        </Typography>
        {session && (
          <Button color='inherit' onClick={handleSignOut}>
            Sign Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
