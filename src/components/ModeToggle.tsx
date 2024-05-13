import React, { useState } from 'react';
import { IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import userManager from '../utils/userManager';

interface ModeToggleProps {}

const ModeToggle: React.FC<ModeToggleProps> = () => {
  const [mode, setMode] = useState<'user' | 'admin'>('user');

  const handleModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'user' | 'admin' | null
  ) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_at');
      await userManager.signoutRedirect();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div
      style={{
        padding: '15px 20px',
        borderTop: '1px solid #ccc',
        color: '#F1F2F6',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        aria-label="User mode"
        size="small"
        sx={{ backgroundColor: '#F1F2F6' }}
      >
        <ToggleButton value="user" aria-label="User">
          User
        </ToggleButton>
        <ToggleButton value="admin" aria-label="Admin">
          Admin
        </ToggleButton>
      </ToggleButtonGroup>
      <IconButton onClick={handleLogout} style={{ color: '#C73659' }}>
        <LogoutIcon />
      </IconButton>
    </div>
  );
};

export default ModeToggle;
