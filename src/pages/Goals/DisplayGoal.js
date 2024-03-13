import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Paper, Typography, LinearProgress, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { goals as dummygoals } from '../../constants/Dummy';
import { ELEVATE_HEALTH_URL } from '../../constants/UrlConstants';
import { useUser } from '../../context/UserContext';

const DisplayGoals = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  const { userEmail } = useUser();
  
  useEffect(() => {
    const encodedEmail = encodeURIComponent(userEmail);
    const fetchGoals = async () => {
      try {
        const response = await fetch(`${ELEVATE_HEALTH_URL}/api/goals?email=${encodedEmail}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGoals(data); 
      } catch (error) {
        console.error("Fetching goals failed: ", error);
        setGoals(dummygoals)
      }
    };

    fetchGoals();
  }, []);
  const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 0),
  }));

  return (
    <Container maxWidth="lg">
      <StyledContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          ACHIEVE YOUR BEST
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/create-goal')}>
          Create a Goal
        </Button>
      </StyledContainer>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Stay on target with a weekly goal
      </Typography>
      <Divider textAlign="left">
        <Typography variant="h6" color="primary" component="span">
          ACTIVE GOALS
        </Typography>
      </Divider>
      {goals?.goals?.map((goal, index) => (
        <Paper key={index} elevation={2} sx={{ mt: 3, p: 2 }}>
          <Typography variant="h6">{goal.activity} {goal.goalTarget} {goal.goalType === 'distance' ? 'miles' : 'hours'} per week</Typography>
          <Typography color="textSecondary">{goal.progress} complete</Typography>
          <LinearProgress variant="determinate" value={(goal.progress / goal.goalTarget) * 100} />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button size="small" onClick={() => console.log('Details for', goal.id)}>
              Show Details
            </Button>
            <Typography variant="body2">{goal.daysLeft} days left for week</Typography>
          </Box>
        </Paper>
      ))}
    </Container>
  );
};

export default DisplayGoals;

