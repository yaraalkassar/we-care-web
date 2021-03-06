import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from './../../firebase/firebase';
import { setSearchedUser } from './../../redux/actions';
import { FiSmile } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { useTranslation } from 'react-i18next';
const RightSidebar = () => {
  let history = useHistory();

  const dispatch = useDispatch();

  const searchedUser = useSelector((state) => state.searchedUser);

  const { t } = useTranslation();

  return (
    searchedUser && (
      <div className="xl:w-1/5 lg:w-1/4 order-1 lg:order-2 w-11/12 md:w-3/5 lg:h-full lg:mt-0 mt-10 mb-5 lg:mb-0 lg:p-0 p-10 lg:bg-darkP bg-white flex flex-col justify-center lg:text-beige text-darkP lg:rounded-none rounded">
        <div className="w-full h-auto self-center justify-evenly flex flex-col items-center">
          <div className="flex flex-col justify-center items-center">
            <img
              className="rounded-full w-24 h-24 mb-4 object-cover"
              src={searchedUser.profilePicture}
              alt="Profile"
            />
            <h2 className="text-lg font-semibold lg:ml-0 ml-4">
              {searchedUser.username}
            </h2>
            <p className="lg:text-sm md:text-base text-sm lg:font-light">
              {t('Joined')}{' '}
              <Moment fromNow>{searchedUser.dateJoined.toDate()}</Moment>
            </p>
          </div>
          <div className="border lg:border-beige border-darkP border-solid rounded-full py-2 mt-10 w-32 text-sm flex items-center h-10 justify-center lg:font-normal font-medium">
            <FiSmile className="mr-3 text-xl" />({searchedUser.friends.length}){' '}
            {searchedUser.friends.length === 1 ? 'friend' : 'friends'}
          </div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (
                searchedUser.friends.includes(firebase.auth.currentUser.uid)
              ) {
                return;
              } else {
                await firebase.addFriend(searchedUser);
                await firebase.getUser(searchedUser.uid).then((doc) => {
                  dispatch(setSearchedUser(doc));
                });
              }
            }}
            className={`${
              searchedUser.uid === firebase.auth.currentUser.uid && 'hidden'
            } text-orangeP border text-center lg:border-orangeP border-darkP lg:bg-transparent mt-10 bg-darkP h-8 border-solid rounded w-32 text-sm ${
              searchedUser.friends.includes(firebase.auth.currentUser.uid)
                ? 'cursor-default focus:outline-none'
                : 'cursor-pointer'
            }`}
          >
            {searchedUser.friends.includes(firebase.auth.currentUser.uid)
              ? "You're friends!"
              : 'Add Friend'}
          </button>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await firebase.createConversation(searchedUser);
              history.push(`/profile/messages/${searchedUser.username}`);
            }}
            className={` ${
              searchedUser.uid === firebase.auth.currentUser.uid && 'hidden'
            } text-orangeP border text-center lg:border-orangeP border-darkP lg:bg-transparent mt-6 bg-darkP h-8 border-solid rounded w-32 text-sm`}
          >
            Send Message
          </button>
        </div>
      </div>
    )
  );
};

export default RightSidebar;
