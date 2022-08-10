import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useStateContext } from '../contexts/ContextProvider';
import { useState } from 'react';
import { useEffect } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Evangel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default function AttendanceForm() {

    const { setIsRegistered, setCurrentMember, server, setAttendanceSubmitted } = useStateContext();
    const [ emailExists, setEmailExists ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ attendance, setAttendance ] = useState('');

    //Check if email exists
    useEffect(() => {
      if(email.length > 5){
      
        const extractedData = {
          email: email,
        }
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(extractedData)
        }
        fetch(`${server}/members/signin`, options).then(res => res.json()).then( member => {
          if(member.email){
            console.log(member)
            setEmailExists(true);
          }else (
            console.log("Member not found")
          )
        }).catch(err => {
          console.log(err)
        })
      }
    }, [email])

    const EmailForm = () => {
      function submitEmail(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setEmail(data.get('email').toLowerCase())
      }
      return (
        <Box component="form" noValidate onSubmit={submitEmail} sx={{ mt: 3, width: '100%' }}  >
          <Grid container spacing={2} >
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      )
    }

    const AttendanceForm = () => {
      function handleAttendance(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setAttendance(data.get('attendance'))
        setAttendanceSubmitted(true)
      }
      return (
        <Box component="form" noValidate onSubmit={handleAttendance} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="attendance"
                label="Number of People Watching"
                id="attendance"
                type='number'
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      )
    }
    const WatchPageRegistrationForm = () => {
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setAttendanceSubmitted(true)
      };
      return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="attendance"
                label="Number of People Watching"
                id="attendance"
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      )
    }

  
    return (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome
            </Typography>
            {email.length < 5? <EmailForm /> : emailExists? <AttendanceForm /> : <WatchPageRegistrationForm /> }
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}