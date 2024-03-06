import React, { useState } from 'react';
import { createTheme,ThemeProvider, Container, CssBaseline, Box, Typography, Grid, TextField, Button, MenuItem, FormControl, InputLabel, Select, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Ensure this icon is imported

const defaultTheme = createTheme();

const CreateGoal = () => {
  const [goal, setGoal] = useState('');
  const [activity, setActivity] = useState('');
  const [goalType, setGoalType] = useState('');
  const [goalTarget, setGoalTarget] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ goal, activity, goalType, goalTarget });
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
            Create Goal
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Goals</InputLabel>
                  <Select
                    value={goal}
                    label="Goals"
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    <MenuItem value="loseWeight">Lose Weight</MenuItem>
                    <MenuItem value="buildMuscle">Build Muscle</MenuItem>
                    <MenuItem value="improveEndurance">Improve Endurance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Activity</InputLabel>
                  <Select
                    value={activity}
                    label="Activity"
                    onChange={(e) => setActivity(e.target.value)}
                  >
                    <MenuItem value="run">Run</MenuItem>
                    <MenuItem value="walk">Walk</MenuItem>
                    <MenuItem value="ride">Ride</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Goal Type</InputLabel>
                  <Select
                    value={goalType}
                    label="Goal Type"
                    onChange={(e) => setGoalType(e.target.value)}
                  >
                    <MenuItem value="distance">Distance</MenuItem>
                    <MenuItem value="duration">Duration</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={goalType === 'distance' ? 'Goal Target (miles)' : 'Goal Target (hours)'}
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  type="number"
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
