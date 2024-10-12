import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import RootLayout from "./components/RootLayout/RootLayout"
import Users from "./components/Users/Users"
import Edituser from './components/Edituser/Edituser'
import NewUser from './NewUsers/NewUser'
import UserById from './components/UserById/UserById'
// import VoiceRecognition from './components/voicerec/VoiceRecognition'
import RemovedUser from './components/RemovedUser/RemovedUser'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Add this line to your main file (main.jsx or index.jsx)

function App() {
  
let router=createBrowserRouter([
  {
    path:"",
    element:<RootLayout/>,
    children:[
      {
          path:"users",
          element:<Users/>
      },
      {
        path:"user/:id",
        element:<UserById/>
      },
      {
        path:"new-user",
        // element:<VoiceRecognition/>
        element:<NewUser/>
      },
      {
        path:"removed-user",
        element:<RemovedUser/>
      },
      {
        path:"edit-user",
        element:<Edituser/>
      }
    ]
  }
])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
