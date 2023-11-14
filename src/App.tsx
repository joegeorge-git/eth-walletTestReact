import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomeScreen } from '@/screens/';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

