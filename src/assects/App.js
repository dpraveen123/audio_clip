import Upload_Clip from './components/Upload_Clip';
import Card from '@mui/material/Card';
import './styles/App.css'
import Login from './components/Login';
import OtpPage from './components/otpPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <div className='app'>
          <Card className='cardStyle'>
          <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/otppage">
              <OtpPage />
            </Route>
            <Route exact path="/home">
              <Upload_Clip />
            </Route>
            {/* <Upload_Clip/> */}

          </Card>
        </div>
      </Switch>
    </Router>


  );
}

export default App;
