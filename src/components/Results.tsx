import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';

import {
  SCORE_RANGES,
  FEEDBACK_MESSAGES,
  SECTION_TIPS,
} from '../constants/quiz';
import { QuizResult } from '../types';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const quizResult: QuizResult = JSON.parse(localStorage.getItem('quizResult') || '{}');

  const getScoreFeedback = (score: number) => {
    if (score >= SCORE_RANGES.thriving.min) {
      return FEEDBACK_MESSAGES.thriving;
    } else if (score >= SCORE_RANGES.doingWell.min) {
      return FEEDBACK_MESSAGES.doingWell;
    } else {
      return FEEDBACK_MESSAGES.needsImprovement;
    }
  };

  const getLowestSection = () => {
    const { physical, emotional, psychological } = quizResult.scores;
    const minScore = Math.min(physical, emotional, psychological);
    if (minScore === physical) return 'physical';
    if (minScore === emotional) return 'emotional';
    return 'psychological';
  };

  if (!quizResult.scores) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Your True-Blue Living Score
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {/* <Grid item xs={12} md={4}> */}
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Physical Well-being</Typography>
              <Typography variant="h4" color="primary">
                {quizResult.scores.physical}/25
              </Typography>
            </Paper>
            {/* </Grid> */}
            {/* <Grid item xs={12} md={4}> */}
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Emotional Well-being</Typography>
              <Typography variant="h4" color="primary">
                {quizResult.scores.emotional}/25
              </Typography>
            </Paper>
            {/* </Grid> */}
            {/* <Grid item xs={12} md={4}> */}
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Psychological Well-being</Typography>
              <Typography variant="h4" color="primary">
                {quizResult.scores.psychological}/25
              </Typography>
            </Paper>
            {/* </Grid> */}
          </Grid>


          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Total Score: {quizResult.scores.total}/75
            </Typography>
            <Typography variant="body1" paragraph>
              {getScoreFeedback(quizResult.scores.total)}
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Personalized Tips
            </Typography>
            <Typography variant="body1" paragraph>
              {SECTION_TIPS[getLowestSection() as keyof typeof SECTION_TIPS]}
            </Typography>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/quiz')}
            >
              Retake Quiz
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/leaderboard')}
            >
              View Leaderboard
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Results; 