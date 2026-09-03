import { createBrowserRouter } from 'react-router-dom'
import Hub from './features/hub/Hub'
import  Todo  from './features/todo/Todo'
import  Tracker  from './features/tracker/Tracker'
import  Finance  from './features/finance/Finance'
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

