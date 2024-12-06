import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//import { AuthProvider } from './auth/context/AuthProvider'
import './styles.css'
import { UsersApp } from './UsersApp'
import 'primereact/resources/themes/saga-blue/theme.css';  // o cualquier otro tema
import 'primereact/resources/primereact.min.css';
   

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
 {/* esto se utiliza con context <AuthProvider> */}
        <UsersApp />
 {/* </AuthProvider>*/}
    </BrowserRouter>
  </React.StrictMode>
)
