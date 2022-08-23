import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import apiSports from '../apis/apiSports';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
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

  useEffect(() => {
    if (selectedDriverId) {
      fetchDriver();
      handleClickOpen();
      console.log('Test2');
    } else {
      console.log('Test');
      handleClose();
    }
  }, [selectedDriverId]);

  const fetchDriver = async () => {
    const response = await apiSports.get('/drivers', {
      params: { id: selectedDriverId },
    });
    setDriverDetails(response.data.response[0]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedDriverId(undefined);
    setOpen(false);
  };

  const driverAge = () => {
    return Math.floor(
      (new Date() - new Date(driverDetails.birthdate).getTime()) / 3.15576e10
    );
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {driverDetails.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
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
          <Typography
            gutterBottom
            style={{ display: 'inline-block' }}
            align="right"
          >
            {driverDetails.nationality} <br />
            {driverDetails.birthdate} <br />
            {driverAge()} <br />
            {driverDetails.career_points} <br />
            {driverDetails.country ? driverDetails.country.name : 'N/A'} <br />
            {driverDetails.grands_prix_entered} <br />
            {driverDetails.highest_grid_position} <br />
            TBD <br />
            {driverDetails.number} <br />
            {driverDetails.podiums} <br />
            {driverDetails.world_championships} <br />
            <br />
          </Typography>
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
