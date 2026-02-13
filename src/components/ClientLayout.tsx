'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Box, Container, Chip } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { theme } from '@/app/theme';
import { ReactNode } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StorageIcon from '@mui/icons-material/Storage';
import HomeIcon from '@mui/icons-material/Home';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Forms', path: '/forms', icon: <FormatListBulletedIcon /> },
    { label: 'Render', path: '/render', icon: <VisibilityIcon /> },
    { label: 'Data', path: '/data', icon: <StorageIcon /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              flexGrow: 1,
              cursor: 'pointer'
            }}
            onClick={() => router.push('/')}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: 'white',
              }}
            >
              F
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
                Form Builder
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.7rem' }}>
                Dynamic Forms System
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                onClick={() => router.push(item.path)}
                startIcon={item.icon}
                sx={{
                  borderRadius: 2,
                  backgroundColor: pathname === item.path ? 'rgba(255,255,255,0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)',
        py: 4 
      }}>
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
}