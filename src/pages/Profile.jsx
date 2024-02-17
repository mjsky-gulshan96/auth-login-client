import Header from "../components/Header";
import ProfileData from "../components/ProfileData";
import { useEffect } from "react";
import axios from 'axios'
import { server } from "../store/serverhost";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

const Profile = () => {
    const profile = useSelector((profileStore) => profileStore.Profile)
    return (
        <>
            <Header/>
            <ProfileData/>
        </>
    );
}

export default Profile;
