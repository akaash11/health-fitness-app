import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userData as dummyUserData } from '../../constants/Dummy';
import { ELEVATE_HEALTH_URL } from '../../constants/UrlConstants';
import { useUser } from '../../context/UserContext';

const defaultTheme = createTheme();

const UserProfile = () => {
  const { userEmail } = useUser();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    country: '',
    weight: '',
    heightFt: '',
    heightIn: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const encodedEmail = encodeURIComponent(userEmail);
      const url = `${ELEVATE_HEALTH_URL}/api/userProfile?email=${encodedEmail}`;
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
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Using dummy data as fallback
        //setUserData(dummyUserData);
      }
    };

    if (userEmail) {
      fetchUserData();
    } else {
      console.log("User email not available");
    }
  }, [userEmail]);

  // Function to format field names
  const formatFieldName = (fieldName) => {
    const formattedFieldName = {
      firstName: "First Name",
      lastName: "Last Name",
      heightFt: "Height Ft",
      heightIn: "Height In"
    }[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1').trim();

    return formattedFieldName;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
            User Profile
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(userData).filter(([key]) => key !== 'userId').map(([key, value]) => (
              <React.Fragment key={key}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'right', paddingRight: 2 }}>
                    {formatFieldName(key)}:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ textAlign: 'left' }}>{value}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default UserProfile;
