import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import useRole from '../Hooks/useRole';
import Forbidden from '../components/Forbidden';


const RiderOnlyRoute = ({children}) => {

    const {loading} = useContext(AuthContext)
    const {role,isLoading} = useRole()

    if(loading || isLoading){
        return <p>loading...</p>
    }

    if(role !== 'rider'){
        return <Forbidden /> 
    }


    return children
};

export default RiderOnlyRoute;