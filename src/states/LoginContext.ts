import {createContext} from 'react';

export const LoginContext = createContext<[boolean,React.Dispatch<React.SetStateAction<boolean>>]|null>(null);