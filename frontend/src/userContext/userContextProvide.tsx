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
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
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
    login: false,
    setLogin: () => {},
    token: null,
    setToken: () => {},
    change:false,
    setChange:()=> {}
});

export default function UserContextProvider({ children }: UserContextProviderProps) {
    const [login, setLogin] = useState<boolean>(false);
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
    const [token, setToken] = useState<string | null>(null);
    const [change,setChange]=useState(false)

    return (
        <UserContext.Provider value={{ login, setLogin, user, setUser, token, setToken ,change,setChange}}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
