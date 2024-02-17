import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { profileActions } from './store/profileSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { server } from "./store/serverhost";

function App() {
  const profile = useSelector((profileStore) => profileStore.profile)
  const [cookies] = useCookies(['authToken']);
  const dispatch = useDispatch()

  // get profile on page load only
  const getProfile = async () => {
    const res = await axios.get(`${server}profile`, {
      headers: {
        authToken: cookies.authToken,
        rememberMe: cookies.rememberMe
      },
      withCredentials: true
    })
    if (res.status == 200) {     
      dispatch(profileActions.setProfile({ profile: res.data.user }))
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    if (!profile) {
      getProfile()
    }
    return () => {
      controller.abort()
    };
  }, []);


  return (
    <>
      <Outlet />
    </>
  )
}

export default App
