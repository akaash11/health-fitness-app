import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { workoutData as dummyWorkoutData} from '../../constants/Dummy';
import { ELEVATE_HEALTH_URL } from '../../constants/UrlConstants';
import { useUser } from '../../context/UserContext';

const WorkoutRecommendation = () => {
  const [workoutData, setWorkoutData] = useState({ bmi: '', plans: [] });
  const { userEmail } = useUser();

  useEffect(() => {
    const fetchWorkoutData = async () => {
      const encodedEmail = encodeURIComponent(userEmail);
      const url = `${ELEVATE_HEALTH_URL}/api/recommendations?email=${encodedEmail}`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWorkoutData(data);
      } catch (error) {
        setWorkoutData(dummyWorkoutData);
        console.error('Failed to fetch workout data:', error);
      }
    };

    if (userEmail) {
      fetchWorkoutData();
    } else {
      console.log("User email not available");
    }
  }, [userEmail]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Workout Recommendation
      </Typography>
      <Grid container spacing={2}>
        {workoutData.plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {plan.excercise}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Fitness Goal: {plan.fitnessGoal}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Activity: {plan.activity}
                </Typography>
                <Typography variant="body2">
                  Weekly Plan:
                  <ul>
                    {plan.weeklyPlan.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WorkoutRecommendation;

