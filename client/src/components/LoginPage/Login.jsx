import React from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';

function Login() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '24px',
          bgcolor: '#1c1c1e',
          borderRadius: '8px',
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="white">
          Sign in
        </Typography>

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#ccc' } }}
          InputProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#3a3a3c',
              },
              '&:hover fieldset': {
                borderColor: '#5a5a5c',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#7a7a7c',
              },
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#ccc' } }}
          InputProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#3a3a3c',
              },
              '&:hover fieldset': {
                borderColor: '#5a5a5c',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#7a7a7c',
              },
            },
          }}
        />

        <FormControlLabel
          control={<Checkbox style={{ color: '#3a3a3c' }} />}
          label="Remember me"
          sx={{ color: '#ccc', marginBottom: '16px' }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#3a3a3c',
            color: 'white',
            padding: '12px 0',
            marginBottom: '16px',
            '&:hover': {
              bgcolor: '#5a5a5c',
            },
          }}
        >
          Sign in
        </Button>

        <Typography variant="body2" color="white">
          Don't have an account?{' '}
          <Button sx={{ color: '#3a82f6' }} size="small">
            Sign up
          </Button>
        </Typography>

        <Typography variant="body2" color="white" sx={{ margin: '16px 0' }}>
          or
        </Typography>

        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{
            color: '#ccc',
            borderColor: '#3a3a3c',
            marginBottom: '8px',
            '&:hover': {
              borderColor: '#5a5a5c',
            },
          }}
        >
          Sign in with Google
        </Button>

        <Button
          variant="outlined"
          startIcon={<FacebookIcon />}
          fullWidth
          sx={{
            color: '#ccc',
            borderColor: '#3a3a3c',
            '&:hover': {
              borderColor: '#5a5a5c',
            },
          }}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
