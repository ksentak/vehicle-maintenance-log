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
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Sign in with one-time password
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.log(error);
      alert('Uh oh. Something went wrong when trying to sign in.');
    } else {
      alert('Check your email for a one time passcode.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    if (error) {
      console.log(error);
      alert('Uh oh. Something went wrong when trying to sign in.');
    }

    setLoading(false);
    setOtpSent(true);
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
        <Box component='form' sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            size='small'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />
          {!otpSent ? (
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSendOtp}
              disabled={loading}
            >
              Send OTP
            </Button>
          ) : (
            <>
              <TextField
                margin='normal'
                required
                fullWidth
                id='otp'
                label='OTP'
                name='otp'
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                Verify OTP
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
