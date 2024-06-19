import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/home/Main";
// import store from "./redux/store";
// import { getUserAction } from "./redux/actions/userActions";
import { AlertProvider } from "./components/utils/alertProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AlertProvider>
          <Main />
        </AlertProvider>
      </>
    ),
  },
]);

function App() {
  // useEffect(() => {
  //   store.dispatch(getUserAction());
  // });
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
