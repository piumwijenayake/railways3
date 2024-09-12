import React, { useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  LinearProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modals from '../Popup/Modal';

const TrainTable = ({ results, selected, handleSelectAllClick, handleClick, isSelected }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [result, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [dataPosting, setDataPosting] = useState(false);
  const [cancelButtonClicked, setCancelButtonClicked] = useState(false);
  const [passengerInfo, setPassengerInfo] = useState({
    nic: '',
    email: '',
    name: '',
    age: '',
    gender: '',
    fullName: ''
  });
  const [formErrors, setFormErrors] = useState({
    nic: '',
    email: '',
    name: '',
    age: '',
    gender: '',
    fullName: ''
  });

  const openModal = (data, event) => {
    event.stopPropagation();
    setSelectedRowData(data);
    setPassengerInfo({
      nic: '',
      email: '',
      name: '',
      age: '',
      gender: '',
     
    });
    setFormErrors({
      nic: '',
      email: '',
      name: '',
      age: '',
      gender: '',
     
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRowData(null);
  };

  const handleSearch = async () => {
    setLoading(true);
    setDataPosting(true);
    try {
      const response = await axios.post('http://localhost:3000/services/books/trains/Bookingseats', {
        customerName: passengerInfo.name,
        trainName: selectedRowData.trainnm,
        fromLocation: selectedRowData.fromlocation,
        toLocation: selectedRowData.tolocation,
        dateArrived: selectedRowData.datearrived,
        seatNo: selectedRowData.seatno,
        bookingNo: selectedRowData.BookingNo,
        Price: selectedRowData.Price,
        status: 'Active',
        dateToLeave: '2023-12-03',
        nic:passengerInfo.nic,
        email:passengerInfo.email,
         age :passengerInfo.age,
         gender:passengerInfo.gender
      });
      setResults(response.data);
      toast.success('Posted successfully!');
      setShowCancelButton(true);
      setTimeout(() => setShowCancelButton(false), 120000);
    } catch (err) {
      setError('An error occurred while fetching data.');
      toast.error('Error posting data.');
      console.log(err);
    } finally {
      setLoading(false);
      setDataPosting(false);
    }
  };

  const handleCancelClick = () => {
    if (dataPosting) {
      setCancelButtonClicked(true);
      toast.info('Data is currently being posted. Please wait until the process is complete.');
    } else {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo({ ...passengerInfo, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!passengerInfo.nic) {
      errors.nic = 'NIC is required';
      isValid = false;
    } else {
      errors.nic = '';
    }

    if (!passengerInfo.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(passengerInfo.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    } else {
      errors.email = '';
    }

    if (!passengerInfo.name) {
      errors.name = 'Name is required';
      isValid = false;
    } else {
      errors.name = '';
    }

    if (!passengerInfo.age || isNaN(passengerInfo.age)) {
      errors.age = 'Age is required and must be a number';
      isValid = false;
    } else {
      errors.age = '';
    }

    if (!passengerInfo.gender) {
      errors.gender = 'Gender is required';
      isValid = false;
    } else {
      errors.gender = '';
    }

    

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSearch();
    }
  };

  return (
    <TableContainer component={Paper} style={{ width: '1110px', margin: '0 auto' }}>
      {loading && <LinearProgress />}
      <Table style={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < results.length}
                checked={results.length > 0 && selected.length === results.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell>Train Name</TableCell>
            <TableCell>From Location</TableCell>
            <TableCell>To Location</TableCell>
            <TableCell>Date of Arrival</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((item) => {
            const isItemSelected = isSelected(item._id);
            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, item._id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={item._id}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': item._id }}
                  />
                </TableCell>
                <TableCell>{item.trainnm}</TableCell>
                <TableCell>{item.fromlocation}</TableCell>
                <TableCell>{item.tolocation}</TableCell>
                <TableCell>{new Date(item.datearrived).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={(event) => openModal(item, event)}
                  >
                    Book Now
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {selectedRowData && (
        <Modals isOpen={isModalOpen} onClose={closeModal}>
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={closeModal}>×</button>
              <div className="modal-body">
                <div className="modal-card-container">
                  {/* Main Card */}
                  <div className="modal-card main-card">
                    <h2>Booking Confirmation</h2>
                    <div className="input-group">
                      <label>Customer Name:</label>
                      <span>{selectedRowData.customerName}</span>
                    </div>
                    <div className="input-group">
                      <label>Train Name:</label>
                      <span>{selectedRowData.trainnm}</span>
                    </div>
                    <div className="input-group">
                      <label>From Location:</label>
                      <span>{selectedRowData.fromlocation}</span>
                    </div>
                    <div className="input-group">
                      <label>To Location:</label>
                      <span>{selectedRowData.tolocation}</span>
                    </div>
                    <div className="input-group">
                      <label>Date of Arrival:</label>
                      <span>{new Date(selectedRowData.datearrived).toLocaleDateString()}</span>
                    </div>
                    <div className="receipt-footer">
                      <div className="receipt-table">
                        <div className="receipt-header">
                          <div className="receipt-cell">Seat No</div>
                          <div className="receipt-cell">Booking No</div>
                          <div className="receipt-cell">Payment</div>
                        </div>
                        <div className="receipt-row">
                          <div className="receipt-cell">{selectedRowData.seatno}</div>
                          <div className="receipt-cell">{selectedRowData.BookingNo}</div>
                          <div className="receipt-cell">{selectedRowData.Price}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information Card */}
                  <div className="modal-card additional-info-card">
                    <h2>Additional Information</h2>
                    <div className="input-group">
                      <TextField
                        name="nic"
                        label="NIC"
                        value={passengerInfo.nic}
                        onChange={handleInputChange}
                        error={!!formErrors.nic}
                        helperText={formErrors.nic}
                        fullWidth
                      />
                    </div>
                    <div className="input-group">
                      <TextField
                        name="email"
                        label="Email"
                        value={passengerInfo.email}
                        onChange={handleInputChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        fullWidth
                      />
                    </div>
                    <div className="input-group">
                      <TextField
                        name="name"
                        label="Name"
                        value={passengerInfo.name}
                        onChange={handleInputChange}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                        fullWidth
                      />
                    </div>
                    <div className="input-group">
                      <TextField
                        name="age"
                        label="Age"
                        type="number"
                        value={passengerInfo.age}
                        onChange={handleInputChange}
                        error={!!formErrors.age}
                        helperText={formErrors.age}
                        fullWidth
                      />
                    </div>
                    <div className="input-group">
                      <FormControl fullWidth error={!!formErrors.gender}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          name="gender"
                          value={passengerInfo.gender}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                        {formErrors.gender && <FormHelperText>{formErrors.gender}</FormHelperText>}
                      </FormControl>
                    </div>
                   
                    <div className="button-container">
                    <Button
                      className="btn-red"
                      onClick={handleCancelClick}
                      disabled={dataPosting}
                    >
                      Cancel
                    </Button>
                    <Button className="btn-blue" onClick={handleSubmit}>Confirm</Button>
                  </div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
        </Modals>
      )}
      <ToastContainer />
    </TableContainer>
  );
};

export default TrainTable;
