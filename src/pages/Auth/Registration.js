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
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ELEVATE_HEALTH_URL } from '../../constants/UrlConstants';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const defaultTheme = createTheme();

const Registration = () => {

  const [birthdate, setBirthdate] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const { setUserEmail } = useUser();
  const navigate = useNavigate();
  
  const validate = (event) => {
    const data = new FormData(event.currentTarget);
    let tempErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'city', 'state', 'country', 'weight', 'heightFt', 'heightIn'];
    requiredFields.forEach(field => {
      if (!data.get(field)) {
        tempErrors = { ...tempErrors, [field]: 'This field is required' };
      }
    });

    if (!birthdate) tempErrors.birthdate = "Birthdate is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  if (validate(event)) {
    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData.entries());

    formProps.birthdate = birthdate;
    try {
      const response = await fetch(`${ELEVATE_HEALTH_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProps),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseText = await response.text();
      console.log(`Response received: '${responseText}'`);

      //const data = await response.json();
      console.log('Submission successful');
      setUserEmail(formProps.email);
      navigate('/profile');
    } catch (error) {
      console.error('Submission failed', error);
      // Delete this code
      /* setUserEmail(formProps.email);
      navigate('/profile'); */
    }
    } else {
      console.log("Form is invalid", errors);
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
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
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid> */}

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Birthdate"
                    value={birthdate}
                    onChange={(newValue) => {
                      const formattedDate = newValue ? newValue.format("YYYY-MM-DD") : null;
                      setBirthdate(formattedDate);
                    }}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        fullWidth 
                        error={!!errors.birthdate} 
                        helperText={errors.birthdate || params.helperText} 
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  name="city"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="State"
                  name="state"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Country"
                  name="country"
                  error={!!errors.country}
                  helperText={errors.country}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Weight (lbs)"
                  name="weight"
                  type="number"
                  error={!!errors.weight}
                  helperText={errors.weight}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Height (ft)"
                  name="heightFt"
                  type="number"
                  error={!!errors.heightFt}
                  helperText={errors.heightFt}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Height (in)"
                  name="heightIn"
                  type="number"
                  error={!!errors.heightIn}
                  helperText={errors.heightIn}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => navigate('/login')}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Registration;
