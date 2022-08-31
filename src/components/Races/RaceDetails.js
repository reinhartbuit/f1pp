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
} from '@mui/material';

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

export default function RaceDetails({ selectedRaceId, setSelectedRaceId }) {
  const [open, setOpen] = useState(false);
  const [circuitDetails, setCircuitDetails] = useState({});

  useEffect(() => {
    if (selectedRaceId) {
      fetchCircuit();
      handleClickOpen();
    } else {
      setCircuitDetails({});
      handleClose();
    }
  }, [selectedRaceId]);

  const fetchCircuit = async () => {
    const response = await apiSports.get('/circuits', {
      params: { id: selectedRaceId },
    });
    setCircuitDetails(() => response.data.response[0]);
    console.log(response);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedRaceId(null);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xl"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {circuitDetails.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1} direction="row" alignItems="left">
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
                alt={circuitDetails.name}
                src={circuitDetails.image}
              />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs={6}>
                <Typography gutterBottom style={{ display: 'inline-block' }}>
                  First GrandPrix: <br />
                  Laps: <br />
                  Length: <br />
                  Capacity: <br />
                  <br />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                  style={{ display: 'inline-block' }}
                  align="right"
                >
                  {circuitDetails.first_grand_prix} <br />
                  {circuitDetails.laps} <br />
                  {circuitDetails.length} <br />
                  {circuitDetails.race_distance} <br />
                  {circuitDetails.capacity} <br />
                  <br />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
