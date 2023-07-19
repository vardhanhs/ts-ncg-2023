import React, { useState,useEffect } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';

const MyForm = () => {
    const [countryOptions, setCountryOptions] = useState([]);
    const [indicatorOptions, setIndicatorOptions] = useState([]);
  const [country, setCountry] = useState('');
  const [indicator, setIndicator] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch country options
    fetch('http://api.worldbank.org/v2/country')
      .then((response) => response.json())
      .then((data) => {
        setCountryOptions(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching country options:', error);
      });

    // Fetch indicator options
    fetch('https://api.worldbank.org/v2/indicator')
      .then((response) => response.json())
      .then((data) => {
        setIndicatorOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching indicator options:', error);
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  console.log(countryOptions);
  return (
   
    <div>
      <Typography variant="h5">Country and Indicator Selection</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined" >
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label="Country"
          >
            <MenuItem value="">Select a country</MenuItem>
            {countryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="indicator-label">Indicator</InputLabel>
          <Select
            labelId="indicator-label"
            id="indicator"
            value={indicator}
            onChange={(e) => setIndicator(e.target.value)}
            label="Indicator"
          >
            <MenuItem value="">Select an indicator</MenuItem>
            {indicatorOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="startDate"
          label="Start Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          id="endDate"
          label="End Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default MyForm;