import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import OverView from 'scenes/overview';

import Dashboard from 'scenes/dashboard';
import Layout from 'scenes/layout';
import Products from 'scenes/products';
import Customers from 'scenes/customers';
import Transaction from 'scenes/transactions';
import Geography from 'scenes/geography';
import Daily from 'scenes/daily';
import Monthly from 'scenes/monthly';
import Breakdown from 'scenes/breakdown';
import Admin from 'scenes/admin';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<OverView />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
