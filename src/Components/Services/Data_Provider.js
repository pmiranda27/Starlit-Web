import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './Api_Service';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
}