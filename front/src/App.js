import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/home/Main";
import store from "./redux/store";
// import { getUserAction } from "./redux/actions/userActions";
import { AlertProvider } from "./components/utils/alertProvider";
import Project from "./components/projects/Project";
import allAction from "./redux/actions/allAction";
import { useEffect, useState } from "react";
import LoginPage from "./components/admin/LoginPage";
import ProjectDetails from "./components/projects/projectDetails";
import SignupPage from "./components/admin/SignupPage";
import CreateProject from "./components/admin/CreateProject";
import { useTheme } from "@emotion/react";
import theme from "./components/utils/themes/muiTheme";
import ProtectRoute from "./components/utils/protectRoute";
import CreateSkill from "./components/admin/createSkill";
import AllProjects from "./components/admin/allProjects";
import Navbar from "./components/utils/headFoot/Navbar";
import AllUsers from "./components/admin/allUsers";
import AllSkills from "./components/admin/allSkills";

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
    path: "/admin/users",
    element: (
      <ProtectRoute>
        <Navbar />
        <AllUsers />
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
    path: "/admin/skills/new",
    element: (
      <ProtectRoute>
        <CreateSkill />
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
  useEffect(() => {
    store.dispatch(allAction());
  }, [store]);

  const themes = useTheme(theme);
  const [mode, setMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (!theme)
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    setMode(theme);
    document.body.className = theme;
  }, [mode]);

  const data = window.matchMedia("(prefers-color-scheme: dark)");

  data.addEventListener("change", (e) => {
    setMode(
      (themes.palette.mode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light")
    );
  });
  // useEffect(() => {
  // }, [mode, theme.palette]);

  // const submit = () => {
  //   window.matchMedia("(prefers-color-scheme: dark)").dispatchEvent("change");
  //   console.log(window.matchMedia("(prefers-color-scheme: dark)"));

  //   setMode(
  //     (themes.palette.mode = window.matchMedia("(prefers-color-scheme: dark)")
  //       .matches
  //       ? "dark"
  //       : "light")
  //   );
  //   console.log(mode);
  // };

  return (
    <div className={mode}>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </div>
  );
}

export default App;
