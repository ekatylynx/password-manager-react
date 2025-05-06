import { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

// import MainPage from '@/pages/MainPage/ui/MainPage';
// import Sidebar from '@/components/Sidebar/ui/Sidebar';
import LayoutPage from '@/pages/LayoutPage/ui/LayoutPage';
import ProtectedRoute from './routes/ProtectedRoute';
import MainPage from './pages/MainPage/ui/MainPage';
import AuthLayout from './pages/AuthLayout/ui/AuthLayout';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Начальный экран для неавторизованных пользователей */}
        <Route path='/start' element={<AuthLayout />}>
          <Route path='/start/form' element={<LayoutPage />} />
        </Route>

        {/* Защищенные роуты список паролей */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path='/' element={<MainPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
