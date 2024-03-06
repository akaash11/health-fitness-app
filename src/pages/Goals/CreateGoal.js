import React, { useState } from 'react';
import { createTheme,ThemeProvider, Container, CssBaseline, Box, Typography, Grid, TextField, Button, MenuItem, FormControl, InputLabel, Select, Avatar, FormHelperText } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Ensure this icon is imported

const defaultTheme = createTheme();

const CreateGoal = () => {
  const [goal, setGoal] = useState('');
  const [activity, setActivity] = useState('');
  const [goalType, setGoalType] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.goal = goal ? "" : "This field is required.";
    tempErrors.activity = activity ? "" : "This field is required.";
    tempErrors.goalType = goalType ? "" : "This field is required.";
    tempErrors.goalTarget = goalTarget ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log({ goal, activity, goalType, goalTarget });
      // Here, you can proceed with form submission, such as sending data to a server.
    }
  };
  return(
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
