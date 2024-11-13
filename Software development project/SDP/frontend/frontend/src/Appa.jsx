import React from 'react';
import { Drawer, List, ListItem, ListItemText, CssBaseline, Toolbar, AppBar, Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

function Appa() {
  const [drawerOpen, setDrawerOpen] = React.useState(true); // Keep drawer state independent

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen); // Toggle drawer state when needed
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* AppBar adjusts width dynamically based on drawer open/closed state */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
          ml: drawerOpen ? `${drawerWidth}px` : 0,
          transition: 'width 0.3s ease', // Smooth transition on resizing
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            My Application
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent" // Keeps drawer persistent
        open={drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem>
            <button onClick={handleDrawerToggle}>x</button>
          </ListItem>
          <ListItem button component={Link} to="/dashboardMain">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/inbox">
            <ListItemText primary="Inbox" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content adjusts padding based on drawer state */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          bgcolor: 'background.default', 
          p: 3,
          transition: 'margin-left 0.3s ease', // Smooth transition on margin-left when drawer toggles
          marginLeft: drawerOpen ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar />
        {/* Main content goes here */}
      </Box>
    </Box>
  );
}

export default Appa;
