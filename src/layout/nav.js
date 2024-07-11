import * as React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Nav = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor:'#454545',
        padding: '16px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        height: '5vh',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ color: 'white'}}>Code Hub Community</h1>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTab-root': {
              color: 'white',
              textShadow: 'blue',
            },
            '& .Mui-selected': {
              color: 'white',
              textShadow: 'red',
            },
          }}
        >
          <Tab label="Home" component={Link} to="/" {...a11yProps(0)} />
          <Tab label="Register / Login" component={Link} to="/register" {...a11yProps(1)} />
          <Tab label="Posts" component={Link} to="/posts" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* Home page content */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* Register / Login page content */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* Posts page content */}
      </CustomTabPanel>
    </Box>
  );
};

export default Nav;
