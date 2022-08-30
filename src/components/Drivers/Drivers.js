import React, { useEffect, useState } from 'react';

import apiSports from '../../apis/apiSports';
import DriverDetail from './DriverDetail';

import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Paper,
  Grid,
  styled,
} from '@mui/material';

const Drivers = ({ selectedSeason }) => {
  const [rankings, setRankings] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  useEffect(() => {
    fetchRankings(selectedSeason).catch(console.error);
  }, [selectedSeason]);

  const setDriver = (driver) => {
    setSelectedDriverId(driver.id);
  };

  const fetchRankings = async (season) => {
    const response = await apiSports.get('/rankings/drivers', {
      params: { season: season },
    });
    setRankings(response.data.response);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    //theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const renderList = rankings.map((ranking) => {
    const { driver, team } = ranking;

    return (
      <Grid key={driver.id} xs={2}>
        <Item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image={driver.image}
                alt="Driver"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {driver.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Team: {team.name} <br />
                  Position: {ranking.position} <br />
                  Points: {ranking.points}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => setDriver(driver)}
              >
                More info...
              </Button>
            </CardActions>
          </Card>
        </Item>
      </Grid>
    );
  });

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}>
          {renderList}
        </Grid>
      </Box>
      <DriverDetail
        selectedDriverId={selectedDriverId}
        setSelectedDriverId={setSelectedDriverId}
      />
    </div>
  );
};

export default Drivers;
