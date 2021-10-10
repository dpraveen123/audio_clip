/* 
================ APP COMPONENT ===============
This is the root component of this application.
The routes are configured in this component.
 */

import Upload_Clip from './components/UploadClip';
import Card from '@mui/material/Card';
import './styles/App.css'
import Login from './components/Login';
import OtpPage from './components/OtpPage';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className='app'>
        <Card className='cardStyle'>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/otppage">
            <OtpPage />
          </Route>
          <Route path="/home">
            <Upload_Clip />
          </Route>

        </Card>
      </div>
    </Router>
  );
}

export default App;
