import React, { createContext, useState } from "react";
import PropTypes from 'prop-types';

interface UserContextProviderProps {
    children: React.ReactNode;
}

export interface UserContextType {
    user: {
        id: string;
        email: string;
        city?: string;
        address?: string;
        contact?: number;
        name?: string;
    };
    setUser: React.Dispatch<React.SetStateAction<{
        id: string;
        email: string;
        city?: string;
        address?: string;
        contact?: number;
        name?: string;
    }>>;
    
    change:boolean;
    setChange:React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<UserContextType>({
    user: {
        id: '',
        email: '',
        city: '',
        address: '',
        contact: 0,
        name: '',
    },
    setUser: () => {},
    change:false,
    setChange:()=> {}
});

export default function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<{
        id: string;
        email: string;
        city?: string;
        address?: string;
        contact?: number;
        name?: string;
    }>({
        id: '',
        email: '',
        city: '',
        address: '',
        contact: 0,
        name: ''
    });
    
    const [change,setChange]=useState(false)

    return (
        <UserContext.Provider value={{user, setUser,change,setChange}}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
