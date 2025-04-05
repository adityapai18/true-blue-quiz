import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import { Organization, Department } from '../types';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  organization: Yup.string().required('Organization is required'),
  department: Yup.string().required('Department is required'),
  role: Yup.string().required('Role is required'),
});

const organizations: Organization[] = ['LV', 'HoABL', 'Bonito'];
const departments: Department[] = ['HR', 'Finance', 'Operations', 'IT', 'Marketing', 'Sales', 'Others'];

const UserInfoForm: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      organization: '' as Organization,
      department: '' as Department,
      role: '',
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('userInfo', JSON.stringify(values));
      navigate('/quiz');
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            True-Blue Living Quiz
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
            Please provide your information to begin the quiz
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              id="organization"
              name="organization"
              label="Organization"
              value={formik.values.organization}
              onChange={formik.handleChange}
              error={formik.touched.organization && Boolean(formik.errors.organization)}
              helperText={formik.touched.organization && formik.errors.organization}
              sx={{ mb: 2 }}
            >
              {organizations.map((org) => (
                <MenuItem key={org} value={org}>
                  {org}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              id="department"
              name="department"
              label="Department"
              value={formik.values.department}
              onChange={formik.handleChange}
              error={formik.touched.department && Boolean(formik.errors.department)}
              helperText={formik.touched.department && formik.errors.department}
              sx={{ mb: 2 }}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              id="role"
              name="role"
              label="Role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              sx={{ mb: 3 }}
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              size="large"
            >
              Start Quiz
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserInfoForm; 