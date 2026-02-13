'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { theme } from './theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Dynamic Form Builder
              </Typography>
              <Button color="inherit" component={Link} href="/forms">
                Forms
              </Button>
              <Button color="inherit" component={Link} href="/render">
                Render
              </Button>
              <Button color="inherit" component={Link} href="/data">
                Data
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}