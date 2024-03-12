import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme,ThemeProvider, Container, CssBaseline, Box, Typography, Grid, TextField, Button, MenuItem, FormControl, InputLabel, Select, Avatar, FormHelperText, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Ensure this icon is imported
import { ELEVATE_HEALTH_URL } from '../../constants/UrlConstants';
import { useUser } from '../../context/UserContext';

const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateGoal = () => {
  const [goal, setGoal] = useState('');
  const [activity, setActivity] = useState('');
  const [goalType, setGoalType] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { userEmail } = useUser();

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.goal = goal ? "" : "This field is required.";
    tempErrors.activity = activity ? "" : "This field is required.";
    tempErrors.goalType = goalType ? "" : "This field is required.";
    tempErrors.goalTarget = goalTarget ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log({ goal, activity, goalType, goalTarget });
      const formData = {
        goal,
        activity,
        goalType,
        goalTarget: parseFloat(goalTarget),
        email: userEmail,
      };
      try {
        const response = await fetch(`${ELEVATE_HEALTH_URL}/api/goals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseText = await response.text();
        console.log(`Response received: '${responseText}'`);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/display-goal');
        }, 3000);
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  return(
  <ThemeProvider theme={defaultTheme}>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Goal created successfully!
        </Alert>
      </Snackbar>
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
            Create Goal
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.goal)}>
                  <InputLabel>Goals</InputLabel>
                  <Select
                    value={goal}
                    label="Goals"
                    onChange={(e) => setGoal(e.target.value)}
                    required
                  >
                    <MenuItem value="loseWeight">Lose Weight</MenuItem>
                    <MenuItem value="buildMuscle">Build Muscle</MenuItem>
                    <MenuItem value="improveEndurance">Improve Endurance</MenuItem>
                  </Select>
                  {errors.goal && <FormHelperText>{errors.goal}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.activity)}>
                  <InputLabel>Activity</InputLabel>
                  <Select
                    value={activity}
                    label="Activity"
                    onChange={(e) => setActivity(e.target.value)}
                    required
                  >
                    <MenuItem value="run">Run</MenuItem>
                    <MenuItem value="walk">Walk</MenuItem>
                    <MenuItem value="ride">Ride</MenuItem>
                  </Select>
                  {errors.activity && <FormHelperText>{errors.activity}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.goalType)}>
                  <InputLabel>Goal Type</InputLabel>
                  <Select
                    value={goalType}
                    label="Goal Type"
                    onChange={(e) => setGoalType(e.target.value)}
                    required
                  >
                    <MenuItem value="distance">Distance</MenuItem>
                    <MenuItem value="duration">Duration</MenuItem>
                  </Select>
                  {errors.goalType && <FormHelperText>{errors.goalType}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={goalType === 'distance' ? 'Goal Target (miles)' : 'Goal Target (hours)'}
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  type="number"
                  error={Boolean(errors.goalTarget)}
                  helperText={errors.goalTarget}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Goal
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateGoal;
