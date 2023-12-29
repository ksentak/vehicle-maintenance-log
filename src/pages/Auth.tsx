import { useState } from 'react';
import { supabase } from '../supabase/client';
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Alert,
  AlertColor,
} from '@mui/material';
import { isValidEmail } from '../utils/utils';

type AlertMessageObj = {
  msg: string;
  type: AlertColor;
};

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [alertMessageObj, setAlertMessageObj] = useState<AlertMessageObj>({
    msg: '',
    type: 'info',
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowAlert(false);

    if (!isValidEmail(email)) {
      setAlertMessageObj({
        msg: 'Please enter a valid email address.',
        type: 'error',
      });
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    // Sign in with one-time password
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.log(error);
      setAlertMessageObj({
        msg: 'Uh oh. Something went wrong when trying to sign in.',
        type: 'error',
      });
      setShowAlert(true);
    } else {
      setAlertMessageObj({
        msg: 'Check your email for a one time passcode.',
        type: 'info',
      });
      setShowAlert(true);
      setOtpSent(true);
    }

    setIsLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowAlert(false);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    if (error) {
      console.log(error);
      setAlertMessageObj({
        msg: 'Uh oh. Something went wrong when trying to sign in.',
        type: 'error',
      });
      setShowAlert(true);
    }

    setIsLoading(false);
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
          Sign In / Sign Up
        </Typography>
        <Typography variant='body1' sx={{ mt: 2 }}>
          Enter your email to receive a one-time passcode.
        </Typography>
        {showAlert && (
          <Alert severity={alertMessageObj.type} sx={{ width: '95%', mt: 2 }}>
            {alertMessageObj.msg}
          </Alert>
        )}
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
              disabled={isLoading}
            >
              Send Passcode
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
                size='small'
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleVerifyOtp}
                disabled={isLoading}
              >
                Verify Passcode
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
