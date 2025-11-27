import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import useRole from '../Hooks/useRole';
import Forbidden from '../components/Forbidden';

const AdminOnlyRoute = ({children}) => {

    const {loading} = useContext(AuthContext)
    const {role,isLoading} = useRole()

    if(loading || isLoading){
        return <p>loading...</p>
    }

    if(role !== 'admin'){
        return <Forbidden /> 
    }


    return children
};

export default AdminOnlyRoute;