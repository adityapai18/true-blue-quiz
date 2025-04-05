import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  PHYSICAL_QUESTIONS,
  EMOTIONAL_QUESTIONS,
  PSYCHOLOGICAL_QUESTIONS,
  RESPONSE_SCORES,
  SLEEP_SCORES,
  SMOKING_SCORES,
} from '../constants/quiz';
import { ResponseOption, SleepHours, CigarettesPerDay } from '../types';

const steps = ['Physical Well-being', 'Emotional Well-being', 'Psychological Well-being'];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      physical: {
        breaks: '' as ResponseOption,
        hydration: '' as ResponseOption,
        movement: '' as ResponseOption,
        foodChoices: '' as ResponseOption,
        smoking: '' as CigarettesPerDay,
      },
      emotional: {
        socialInteraction: '' as ResponseOption,
        familyTime: '' as ResponseOption,
        gratitude: '' as ResponseOption,
        hobbies: '' as ResponseOption,
        vacationPlanning: '' as ResponseOption,
      },
      psychological: {
        breaks: '' as ResponseOption,
        phoneDetox: '' as ResponseOption,
        satisfaction: '' as ResponseOption,
        sleep: '' as SleepHours,
        focus: '' as ResponseOption,
      },
    },
    validationSchema: Yup.object({
      physical: Yup.object().shape({
        breaks: Yup.string().required('Required'),
        hydration: Yup.string().required('Required'),
        movement: Yup.string().required('Required'),
        foodChoices: Yup.string().required('Required'),
        smoking: Yup.string().required('Required'),
      }),
      emotional: Yup.object().shape({
        socialInteraction: Yup.string().required('Required'),
        familyTime: Yup.string().required('Required'),
        gratitude: Yup.string().required('Required'),
        hobbies: Yup.string().required('Required'),
        vacationPlanning: Yup.string().required('Required'),
      }),
      psychological: Yup.object().shape({
        breaks: Yup.string().required('Required'),
        phoneDetox: Yup.string().required('Required'),
        satisfaction: Yup.string().required('Required'),
        sleep: Yup.string().required('Required'),
        focus: Yup.string().required('Required'),
      }),
    }),
    onSubmit: (values) => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const scores = {
        physical: calculateSectionScore(values.physical),
        emotional: calculateSectionScore(values.emotional),
        psychological: calculateSectionScore(values.psychological),
      };
      const totalScore = scores.physical + scores.emotional + scores.psychological;

      const result = {
        userInfo,
        responses: values,
        scores: {
          ...scores,
          total: totalScore,
        },
      };

      localStorage.setItem('quizResult', JSON.stringify(result));
      navigate('/results');
    },
  });

  const calculateSectionScore = (section: any) => {
    let score = 0;
    Object.entries(section).forEach(([key, value]) => {
      if (key === 'sleep') {
        score += SLEEP_SCORES[value as SleepHours];
      } else if (key === 'smoking') {
        score += SMOKING_SCORES[value as CigarettesPerDay];
      } else {
        score += RESPONSE_SCORES[value as ResponseOption];
      }
    });
    return score;
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderQuestions = () => {
    const questions = activeStep === 0
      ? PHYSICAL_QUESTIONS
      : activeStep === 1
      ? EMOTIONAL_QUESTIONS
      : PSYCHOLOGICAL_QUESTIONS;

    const section = activeStep === 0 ? 'physical' : activeStep === 1 ? 'emotional' : 'psychological';

    return questions.map((question) => (
      <FormControl
        key={question.id}
        component="fieldset"
        sx={{ mb: 3, width: '100%' }}
      >
        <FormLabel component="legend">{question.text}</FormLabel>
        <RadioGroup
          name={`${section}.${question.id}`}
          value={formik.values[section as keyof typeof formik.values][question.id as keyof typeof formik.values[typeof section]]}
          onChange={formik.handleChange}
        >
          {question.type === 'likert' ? (
            ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))
          ) : question.type === 'sleep' ? (
            ['0-4', '4-6', '6-8', '8+'].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))
          ) : (
            ['0', '1-5', '6-10', '11-20', '20+'].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))
          )}
        </RadioGroup>
      </FormControl>
    ));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Typography variant="h5" gutterBottom>
            {steps[activeStep]}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            {renderQuestions()}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                type={activeStep === steps.length - 1 ? "submit" : "button"}
                onClick={activeStep === steps.length - 1 ? undefined : handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Quiz; 