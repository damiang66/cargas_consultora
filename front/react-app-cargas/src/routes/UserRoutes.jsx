import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
//import { UserProvider } from "../context/UserProvider"
import { RegisterPage } from "../pages/RegisterPage"
import { UsersPage } from "../pages/UsersPage"
import { useAuth } from "../auth/hooks/useAuth"
import { ClientePage } from "../pages/ClientePage"
import { ClienteForm } from "../components/ClienteForm"


export const UserRoutes = () => {
    const { login } = useAuth();;
    return (
        <>
            {/* <UserProvider> */}
                <Navbar />
                <Routes>
                    <Route path="users" element={<UsersPage />} />

                    {!login.isAdmin || <>
                        <Route path="users/register" element={<RegisterPage />} />
                        <Route path="users/edit/:id" element={<RegisterPage />} />
                        <Route path="clientes" element={<ClientePage />} />
                        <Route path="clientes/registrar" element={<ClienteForm />} />
                        <Route path="clientes/editar/:id" element={<ClienteForm />} />
                    </>
                    }
                    <Route path="/" element={<Navigate to="/users" />} />
                </Routes>
            {/* </UserProvider> */}
        </>
    )
}