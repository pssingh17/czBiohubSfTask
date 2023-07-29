import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import Result from './Components/Result';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Main />,
  },
  {
    path: "/getResult",
    element:   <Result />,
  },
]);

function App() {
  return (
    <>
    <h1>Get First N Fibonacci Numbers</h1>
    <RouterProvider router={router} />
   
   
    </>
  );
}

export default App;
