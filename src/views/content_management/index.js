import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const sessions = [
  { title: "Judy Room No. 3", students: 1, availableSeats: 0, activationCode: "F042J" },
  { title: "BT 220", students: 1, availableSeats: 0, activationCode: "5ZLY9" },
  { title: "Homeschool AE", students: 1, availableSeats: 0, activationCode: "285U0" },
  { title: "Homeschoolers", students: 2, availableSeats: 0, activationCode: "7RBS2" },
  // add more sessions as needed
];

const WorkbookLessons = () => {
  return (
    <Grid container spacing={2}>
      {sessions.map((session, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">{session.title}</Typography>
              <Typography variant="h5">{session.students}</Typography>
              <Typography variant="body2">STUDENT ENROLLED</Typography>
              <Typography variant="h5" color="green">{session.availableSeats}</Typography>
              <Typography variant="body2">AVAILABLE SEATS</Typography>
              <Typography variant="body1" fontWeight="bold">
                Activation Code: {session.activationCode}
              </Typography>
              <Button
                endIcon={<ArrowForwardIcon />}
                style={{ textTransform: 'none', marginTop: '10px' }}
              >
                Lessons & Activities
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default WorkbookLessons;
