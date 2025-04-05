import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tabs,
  Tab,
} from '@mui/material';
import { QuizResult } from '../types';

interface LeaderboardData {
  name: string;
  organization: string;
  department: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [sortBy, setSortBy] = useState<keyof LeaderboardData>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [view, setView] = useState<'organization' | 'department'>('organization');

  useEffect(() => {
    // In a real application, this would fetch data from a backend
    const results = JSON.parse(localStorage.getItem('quizResult') || '{}');
    if (results.scores) {
      setLeaderboardData([{
        name: results.userInfo.name,
        organization: results.userInfo.organization,
        department: results.userInfo.department,
        score: results.scores.total,
      }]);
    }
  }, []);

  const handleSort = (property: keyof LeaderboardData) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const sortedData = [...leaderboardData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const groupedData = sortedData.reduce((acc, item) => {
    const key = view === 'organization' ? item.organization : item.department;
    if (!acc[key]) {
      acc[key] = {
        totalScore: 0,
        count: 0,
        members: [],
      };
    }
    acc[key].totalScore += item.score;
    acc[key].count += 1;
    acc[key].members.push(item);
    return acc;
  }, {} as Record<string, { totalScore: number; count: number; members: LeaderboardData[] }>);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4" component="h1">
              Leaderboard
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Back to Quiz
            </Button>
          </Box>

          <Tabs
            value={view}
            onChange={(_, newValue) => setView(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab value="organization" label="By Organization" />
            <Tab value="department" label="By Department" />
          </Tabs>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'name'}
                      direction={sortBy === 'name' ? sortOrder : 'asc'}
                      onClick={() => handleSort('name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === view}
                      direction={sortBy === view ? sortOrder : 'asc'}
                      onClick={() => handleSort(view)}
                    >
                      {view === 'organization' ? 'Organization' : 'Department'}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={sortBy === 'score'}
                      direction={sortBy === 'score' ? sortOrder : 'desc'}
                      onClick={() => handleSort('score')}
                    >
                      Score
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(groupedData).map(([key, data]) => (
                  <React.Fragment key={key}>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell colSpan={2}>
                        <Typography variant="subtitle1">
                          {key} (Average: {(data.totalScore / data.count).toFixed(1)})
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1">
                          {data.totalScore}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {data.members.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>
                          {view === 'organization' ? member.department : member.organization}
                        </TableCell>
                        <TableCell align="right">{member.score}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default Leaderboard; 