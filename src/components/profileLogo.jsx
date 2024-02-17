import '../css/profileLogo.css'
import axios from "axios";
import { useCookies } from 'react-cookie'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { profileActions } from "../store/profileSlice";
import { server } from "../store/serverhost";

const ProfileLogo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [cookies] = useCookies();
  // logout user
  const handleLogOut = async () => {
    const res = await axios.get(`${server}logout`, {
      headers: {
        authToken: cookies.authToken,
        rememberMe: cookies.rememberMe
      },
      withCredentials: true
    })
    if (res.status == 200) {
      dispatch(profileActions.removeProfile())
      navigate('/login')
    }
  }

  return (
    <>
      <div className="logo-img">
        <Link to='/profile'>
          <img className="image" src="picture.png" alt="picture" />
        </Link>
      </div>
      <button type="button" className="btn btn-warning" onClick={handleLogOut}>Log Out</button>
    </>
  );
}

export default ProfileLogo;
