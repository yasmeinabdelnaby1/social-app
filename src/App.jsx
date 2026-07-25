
import { RouterProvider } from "react-router-dom"
import { routes } from "./Routing/AppRouting"
const App = () => {
  return (
    <div>
       <RouterProvider router={routes} />
    </div>
  )
}

export default App
