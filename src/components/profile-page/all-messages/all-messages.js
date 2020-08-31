import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import firebase from './../../../firebase/firebase';
import Loader from './../../loader/loader';

const AllMessages = () => {
  const [usersDocs, setUsersDocs] = useState(null);

  const { t } = useTranslation();

  const getConverssations = async () =>
    await firebase.getUserConversations(setUsersDocs);

  useEffect(() => {
    getConverssations();
  }, []);

  console.log(usersDocs);

  return usersDocs ? (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="overflow-y-auto w-11/12 md:w-9/12 bg-white h-full lg:w-1/2 rounded-md text-darkP flex flex-col justify-start items-center p-10 my-10">
        <h2 className="md:text-2xl text-xl font-semibold mb-10">
          {t('Messages')}
        </h2>
        <ul className="w-full flex flex-col justify-center items-center md:text-base text-sm">
          {usersDocs.map((user) => (
            <li
              key={user.uid}
              className="border-b-2 border-grey py-2 w-full flex justify-center items-center hover:text-orangeP hover:border-orangeP"
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <Loader classes={'w-full h-full'} />
  );
};

export default AllMessages;
