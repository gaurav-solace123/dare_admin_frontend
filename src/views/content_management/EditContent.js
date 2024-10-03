import React from 'react';
import { Box, Button, Typography } from '@mui/material';
const DareDecisionMakingModelPractice = () => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">LESSON 1</Typography>
  
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary">Go Back</Button>
          <Button variant="contained" color="primary">Next</Button>
        </Box>
  
        <Typography variant="h4">D.A.R.E. Decision Making Model Practice</Typography>
  
        <Box border={1} borderRadius={2} padding={2} marginTop={2}>
          <Typography variant="h6">Situation 1</Typography>
          <p>
            You play on a soccer team. The team depends on you as a goalkeeper. You are invited
            to your best friend's birthday party at the same time as the big game. You would have to
            miss the game to go to the party. How do you decide what to do?
          </p>
        </Box>
  
        <Typography variant="h6">DEFINE</Typography>
        <p>Describe the problem, challenge, or opportunity.</p>
      </Box>
    );
  };