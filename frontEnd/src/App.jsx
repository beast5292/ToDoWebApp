import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Signin from "./components/Signin.jsx";
import Userpage from "./components/Userpage.jsx";
import AddTask from "./components/AddTask.jsx";
import DeleteTask from "./components/DeleteTask.jsx";
import EditTask from "./components/EditTask.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route element={<PrivateRoute />}>
        <Route path="/userpage/:userId" element={<Userpage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='/task/:userId' element={<AddTask />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='/tasks/editTask/:userId/:taskId' element={<EditTask />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='/tasks/deleteTask/:userId/:taskId' element={<DeleteTask />} />
      </Route>
    </Routes>
  );
}

export default App;
