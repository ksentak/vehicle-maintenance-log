import { useState } from 'react';
import { supabase } from '../supabase/client';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the login link!');
    }
    setLoading(false);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography component='h1' variant='h4'>
          Vehicle Maintenance Log
        </Typography>
        <Typography variant='body1' sx={{ mt: 2 }}>
          Enter your email to sign in or create an account. A sign-in link will
          be sent to your email address.
        </Typography>
        <Box component='form' sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
            disabled={loading}
          >
            Sign In
          </Button>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
