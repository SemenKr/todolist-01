import {selectIsLoggedIn} from '@/app/appSlice';
import {Main} from '@/app/Main'
import {PageNotFound} from '@/common/components/PageNotFound/PageNotFound'
import {ProtectedRoute} from '@/common/components/ProtectedRoute/ProtectedRoute';
import {useAppSelector} from '@/common/hooks/useAppSelector';
import {Login} from '@/feature/auth/ui/Login/Login';
import {Route, Routes} from 'react-router'

export const Path = {
    Main: '/',
    Login: 'login',
    NotFound: '*',
} as const

export const Routing = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login}/>}>
                <Route path={Path.Main} element={<Main/>}/>
            </Route>
            <Route element={<ProtectedRoute isAllowed={!isLoggedIn}/>}>
                <Route path={Path.Login} element={<Login/>}/>
            </Route>
            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}
