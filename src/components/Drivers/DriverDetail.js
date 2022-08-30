import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiSports from '../../apis/apiSports';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Grid,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DriverDetail({
  selectedDriverId,
  setSelectedDriverId,
}) {
  const [open, setOpen] = useState(false);
  const [driverDetails, setDriverDetails] = useState({});
  const [driverRankings, setDriverRankings] = useState([]);

  useEffect(() => {
    if (selectedDriverId) {
      fetchDriver();
      handleClickOpen();
    } else {
      setDriverDetails({});
      setDriverRankings([]);
      handleClose();
    }
  }, [selectedDriverId]);

  useEffect(() => {
    if (driverDetails && selectedDriverId) {
      fetchRankings();
    }
  }, [driverDetails]);

  const fetchDriver = async () => {
    const response = await apiSports.get('/drivers', {
      params: { id: selectedDriverId },
    });
    setDriverDetails(response.data.response[0]);
  };

  const fetchRankings = async () => {
    const promises = driverDetails.teams.map(async (team) => {
      try {
        const response = await apiSports.get('/rankings/drivers/', {
          params: { driver: driverDetails.id, season: team.season },
        });
        return response.data.response[0];
      } catch {
        return;
      }
    });

    await Promise.all(promises)
      .then(function (season) {
        setDriverRankings(season);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedDriverId(null);
    setOpen(false);
  };

  const driverAge = () => {
    return Math.floor(
      (new Date() - new Date(driverDetails.birthdate).getTime()) / 3.15576e10
    );
  };

  const renderTable = driverRankings.map((ranking) => {
    return (
      <TableRow
        key={ranking.season}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
        }}
      >
        <TableCell component="th" scope="row">
          {ranking.season}
        </TableCell>
        <TableCell align="right">{ranking.team.name}</TableCell>
        <TableCell align="right">{ranking.position}</TableCell>
        <TableCell align="right">{ranking.wins}</TableCell>
        <TableCell align="right">{ranking.points}</TableCell>
        <TableCell align="right">{ranking.behind}</TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xl"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {driverDetails.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={0} direction="row" alignItems="left">
            <Grid item alignItems="left">
              <Box
                component="img"
                sx={{
                  margin: '0px',
                  height: 280,
                  width: 280,
                  maxHeight: { xs: 150, md: 206, lg: 280 },
                  maxWidth: { xs: 150, md: 206, lg: 280 },
                }}
                alt={driverDetails.name}
                src={driverDetails.image}
              />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs={8}>
                <Typography gutterBottom style={{ display: 'inline-block' }}>
                  Nationality: <br />
                  Date of Birth: <br />
                  Age: <br />
                  Career Points: <br />
                  Country:
                  <br />
                  Grand Prix entered: <br />
                  Highest Grid Position: <br />
                  Highest Race Finsh: <br />
                  Racing Number: <br />
                  Podiums: <br />
                  Worlds Championships: <br />
                  <br />
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  style={{ display: 'inline-block' }}
                  align="right"
                >
                  {driverDetails.nationality} <br />
                  {driverDetails.birthdate} <br />
                  {driverAge()} <br />
                  {driverDetails.career_points} <br />
                  {driverDetails.country
                    ? driverDetails.country.name
                    : 'N/A'}{' '}
                  <br />
                  {driverDetails.grands_prix_entered} <br />
                  {driverDetails.highest_grid_position} <br />
                  TBD <br />
                  {driverDetails.number} <br />
                  {driverDetails.podiums} <br />
                  {driverDetails.world_championships} <br />
                  <br />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <h5>Season Breakdown</h5>
          <Grid container>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Season</TableCell>
                      <TableCell align="right">Team</TableCell>
                      <TableCell align="right">Position</TableCell>
                      <TableCell align="right">Wins</TableCell>
                      <TableCell align="right">Points</TableCell>
                      <TableCell align="right">Point Behind</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{renderTable}</TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
