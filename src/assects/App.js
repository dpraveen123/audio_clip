import Upload_Clip from './components/Upload_Clip';
import Card from '@mui/material/Card';
import './styles/App.css'

function App() {
  return (
    <div className='app'>
      <Card className='cardStyle'>
        <Upload_Clip/>
      </Card>
    </div>


  );
}

export default App;
