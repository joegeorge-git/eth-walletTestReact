import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/components/layout';

import { HomeScreen, SendTrx , ContractTrx, ContractReadTrx , SignMsgScreen} from '@/screens/';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/sendtrx" element={<SendTrx />}></Route>
          <Route path="/contract-w" element={<ContractTrx />} ></Route>
          <Route path="/contract-r" element={<ContractReadTrx />} ></Route>
          <Route path="/sign" element={<SignMsgScreen />} ></Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

