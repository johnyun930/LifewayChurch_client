import {createContext} from 'react';

  export const DomainContext = createContext<string>(process.env.REACT_APP_DOMAIN!);
//  export const DomainContext = createContext<string>("http://localhost:8000");
