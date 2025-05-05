import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Editor from './components/Editor';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';
import NotFound from './components/NotFound';
import Loader from './components/Loader';


function App() {
  const {isAuthenticated, isLoading} = useAuth();
  if(isLoading){
    return <Loader/>
  }
  
  return (
    <>
      <Routes>
      <Route
      path="/editor"
      element={<ProtectedRoute><Editor/></ProtectedRoute>}
      />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/editor" : "/auth"}/>}/>
       <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;
