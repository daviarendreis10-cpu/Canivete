import { createBrowserRouter } from 'react-router-dom'
import Hub from '../pages/Hub'
import  Todo  from '../pages/Todo'
import  Tracker  from '../pages/Tracker'
import  Finance  from '../pages/Finance'
import RootLayout from '../pages/RootLayout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Hub/>
            }, {
                path: 'todo',
                element: <Todo/>
            }, {
                path: 'tracker',
                element: <Tracker/>
            }, {
                path:'finance',
                element: <Finance/>
            }
        ]
    }
])

export default router

