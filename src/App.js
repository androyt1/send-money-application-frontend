import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateTransferReceipt from './Screens/Paystack/CreateTransferReceipt';
import VerifyAccountNumber from './Screens/Paystack/VerifyAccountNumber';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={VerifyAccountNumber} />
        <Route
          exact
          path='/create-transfer-receipt'
          component={CreateTransferReceipt}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
