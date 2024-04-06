import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import route from './routes/route';
import { QueryClientProvider, useQueryClient } from 'react-query';


function App() {

  return (
        <RouterProvider router={route} />   
        
  );
}
export default App;
