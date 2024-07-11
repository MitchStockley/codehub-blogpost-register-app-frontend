import * as React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Register from '../components/Register';

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

const Nav2 = () => {
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
            marginRight: 'auto',
            '& .MuiTab-root': {
              color: 'white', // Set the default tab label color to white
              textShadow: 'blue', // Add a glow effect to the tab labels
            },
            '& .Mui-selected': {
              color: 'white', // Set the selected tab label color to a glowing yellow
              textShadow: 'red', // Add a glow effect to the selected tab label
            },
          }}
        >
          <Tab label="Home" component={Link} to="/home" {...a11yProps(0)} />
          <Tab label="Posts" component={Link} to="/posts" {...a11yProps(1)} />
          {/* <Tab label="Blog" component={Link} to="/blog" {...a11yProps(2)} /> */}
          {/* <Tab label="hello" component={Link} to="/login" {...a11yProps(3)} />
          <Tab label="Blog" component={Link} to="/blog" {...a11yProps(4)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* Home page content */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      
        {/* About page content */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* Services page content */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {/* Contact page content */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        {/* Blog page content */}
      </CustomTabPanel>
    </Box>
  );
};

export default Nav2;