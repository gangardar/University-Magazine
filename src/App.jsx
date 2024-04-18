import {RouterProvider } from 'react-router-dom';
import route from './routes/route';
import Redirector from './component/Redirector';


function App() {

  return (
    
        <RouterProvider router={route} />
        
  );
}
export default App;
