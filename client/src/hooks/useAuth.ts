import {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const checkAuth = async () => {
    try{
        const response = await axios.get('http://localhost:5000/api/check-in', {withCredentials : true})
        if(response.status === 200){
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
            navigate('/login');
        }
    }catch(err){
        console.log(`This was the error in the call ${err}`);
        setIsAuthenticated(false);
    } finally{
        setIsLoading(false);
    }
  }
  useEffect(() => {
    checkAuth();
  },[navigate]);

  return {
    isAuthenticated,
    isLoading,
  }
}

export default useAuth