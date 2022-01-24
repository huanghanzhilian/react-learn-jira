// import { Link } from "react-router-dom";
// import { Routes, Route, Navigate } from "react-router";

import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import EpicScreen from "screens/epic";
import KanbanScreen from "screens/kanban";

const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <div>
        <Routes>
          <Route path={"/kanban"} element={<KanbanScreen />}></Route>
          <Route path={"/epic"} element={<EpicScreen />}></Route>
          <Route
            path=""
            element={
              <Navigate
                to={`${window.location.pathname}/kanban`}
                replace={true}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default ProjectScreen;
