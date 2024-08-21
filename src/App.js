import './App.css';
import JoinUsPage from './Screens/Join_Us'

const pages = [
  <JoinUsPage />
];

var pageIndex = 0;

function App() {
  return (
    <div className="App">
      {
        pages[pageIndex]
      }
    </div>
  );
}

export default App;
