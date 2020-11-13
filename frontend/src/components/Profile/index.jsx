import React from 'react';
import Data from './Data';
import Qualification from './Qualification';
import Report from './Report';
import styles from './styles.module.css'
import APIRequest from "../../rest";
import {useState} from 'react'

const user = { // database select imitate
  registationData: {
    name: '',
    surname: '',
    phone: '',
    email: '',
  },
  personalData: {
    bithday: '',
    sex: '',
    citizenship: '',
    position: '',
  },
  cvalificationData: {
    totalExperience: '',
    positionExperience: '',
    allowance: '',
    rating: '',
  },
  startDate: '',
  endDate: '',
}

function ProfileData(props) {
  let user = props.user;
  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <Data
          fullname={user.registationData.name + " " + user.registationData.surname}
          phone={user.registationData.phone}
          email={user.registationData.email}
          bDay={user.personalData.bithday}
          citizenship={user.personalData.citizenship}
          position={user.personalData.position}
          gender={user.personalData.sex}
        />
      </div>
      <div className={styles.right}>
        <Qualification
          fullExperience={user.cvalificationData.fullExperience}
          positionExperience={user.cvalificationData.positionExperience}
          level={user.cvalificationData.level}
        />
        <Report
          startDate={user.startDate}
          endDate={user.endDate}
        />
      </div>
    </div>
  );
}

function Profile() {
  const [profileData, updateProfileData] = useState(user);
  console.log(profileData)
  if (!profileData.status) {
    APIRequest('profile', {}).then(updateProfileData);
  }
  return (<ProfileData user={profileData.status === 'ok' ? profileData : user} />);
}

export default Profile;
