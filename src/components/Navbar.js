import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between">
        <Typography variant="h6">Todo App</Typography>
        <div>
          <Link to="/" className="mr-4 text-white no-underline">
            Home
          </Link>
          <Link to="/fetch-data" className="text-white no-underline">
            Fetch Data
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

