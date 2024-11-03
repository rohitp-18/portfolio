import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/home/Main";
import store from "./redux/store";
import { Helmet } from "react-helmet";
// import { getUserAction } from "./redux/actions/userActions";
import { AlertProvider } from "./components/utils/alertProvider";
import Project from "./components/projects/Project";
import { allAction, countView, createView } from "./redux/actions/allAction";
import { useEffect, useState } from "react";
import LoginPage from "./components/admin/LoginPage";
import ProjectDetails from "./components/projects/projectDetails";
import SignupPage from "./components/admin/SignupPage";
import CreateProject from "./components/admin/CreateProject";
import ProtectRoute from "./components/utils/protectRoute";
import CreateSkill from "./components/admin/createSkill";
import AllProjects from "./components/admin/allProjects";
import Navbar from "./components/utils/headFoot/Navbar";
import AllUsers from "./components/admin/allUsers";
import AllSkills from "./components/admin/allSkills";
import AllEducation from "./components/admin/allEducation";
import AllMessage from "./components/admin/allMessage";
import AllAbout from "./components/admin/allAbout";
import CreateAbout from "./components/admin/createAbout";
import { useDispatch, useSelector } from "react-redux";
import CreateEducation from "./components/admin/createEducation";
import CountView from "./components/admin/countView";

const router = createBrowserRouter([
  {
    path: "/project",
    element: (
      <>
        <Project />
      </>
    ),
  },
  {
    path: "/project/:id",
    element: (
      <>
        <ProjectDetails />
      </>
    ),
  },
  {
    path: "/admin/projects",
    element: (
      <ProtectRoute>
        <Navbar />
        <AllProjects />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/about",
    element: (
      <ProtectRoute>
        <Navbar />
        <AllAbout />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectRoute>
        <Navbar />
        <AllUsers />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/education",
    element: (
      <ProtectRoute>
        <Navbar />
        <AllEducation />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/message",
    element: (
      <ProtectRoute>
        <Navbar />
        <AllMessage />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/skills",
    element: (
      <ProtectRoute>
        <Navbar />
        <AllSkills />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/view",
    element: (
      <ProtectRoute>
        <Navbar />
        <CountView />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
  {
    path: "/admin/sign",
    element: (
      <>
        <SignupPage />
      </>
    ),
  },
  {
    path: "/admin/project/new",
    element: (
      <ProtectRoute>
        <CreateProject />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/about/new",
    element: (
      <ProtectRoute>
        <CreateAbout />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/skills/new",
    element: (
      <ProtectRoute>
        <CreateSkill />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin/education/new",
    element: (
      <ProtectRoute>
        <CreateEducation />
      </ProtectRoute>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <Main />
      </>
    ),
  },
]);

function App() {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (store.all) {
      setState(true);
    }
    return () => {};
  }, [store, state]);

  useEffect(() => {
    dispatch(allAction());
    const id = localStorage.getItem("id");
    if (id) {
      store.dispatch(countView(id));
    } else {
      store.dispatch(createView());
    }

    return () => {};
  }, [store]);

  (() => {
    let themess = localStorage.getItem("mode");

    if (!themess) {
      localStorage.setItem("mode", "light");
      themess = "light";
    }

    document.body.className = themess;
  })();

  const { about } = useSelector((state) => state.all);
  return (
    <AlertProvider>
      {state && about && (
        <Helmet>
          <title>{about.name}</title>
          <link rel="icon" href={about.avatar} />
        </Helmet>
      )}
      <RouterProvider router={router} />
    </AlertProvider>
  );
}

export default App;
