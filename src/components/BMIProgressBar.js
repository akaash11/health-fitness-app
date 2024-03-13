import React from 'react';
import { Typography, Box, LinearProgress, Card, CardContent } from '@mui/material';

const BMIProgressBar = ({ bmi }) => {
  const calculateProgress = (bmi) => {
    if (bmi < 18.5) return (bmi / 18.5) * 100;
    if (bmi <= 24.9) return ((bmi - 18.5) / (24.9 - 18.5)) * 100 + 100;
    if (bmi <= 29.9) return ((bmi - 25) / (29.9 - 25)) * 100 + 200;
    if (bmi > 29.9) return 300;
  };

  const getProgressColor = (bmi) => {
    if (bmi < 18.5) return '#90caf9'; // Blue for underweight
    if (bmi <= 24.9) return '#81c784'; // Green for normal
    if (bmi <= 29.9) return '#ffb74d'; // Orange for overweight
    return '#e57373'; // Red for obesity
  };

  return (
    <Card sx={{ margin: '20px', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Your BMI: {bmi}</Typography>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(bmi)}
              sx={{ height: 10, borderRadius: 5, backgroundColor: '#eee' }}
              style={{ color: getProgressColor(bmi) }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(calculateProgress(bmi))}%`}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          BMI Categories: 
          <ul>
            <li>Underweight: <b>less than 18.5</b></li>
            <li>Normal weight: <b>18.5–24.9</b></li>
            <li>Overweight: <b>25–29.9</b></li>
            <li>Obesity: <b>30 or more</b></li>
          </ul>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BMIProgressBar;
