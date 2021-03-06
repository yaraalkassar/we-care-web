import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import { setSearchedUser } from './../../redux/actions';
import { CgCloseO } from 'react-icons/cg';

const SearchUsers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [foundUsers, setFoundUsers] = useState(null);
  const [openSearchResults, setOpenSearchResults] = useState(false);

  let history = useHistory();

  const dispatch = useDispatch();

  return (
    <>
      <div className="inline relative">
        <input
          type="text"
          autoComplete="off"
          placeholder="Search Users"
          style={{ paddingTop: '0.2rem', paddingBottom: '0.2rem' }}
          className="px-3 text-darkP text-sm rounded focus:outline-none"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(key) => {
            if (key.keyCode === 13) {
              searchUser();
              setOpenSearchResults(true);
            }
          }}
        />
        <div
          className={`w-full bg-white absolute left-0 z-40 rounded mt-1 text-darkP ${
            openSearchResults ? 'block' : 'hidden'
          }`}
        >
          <CgCloseO
            className="absolute right-0 mr-1 mt-1 z-50 cursor-pointer"
            onClick={() => {
              setOpenSearchResults(false);
              setFoundUsers(null);
              setSearchValue('');
            }}
          />
          {foundUsers ? (
            foundUsers.length !== 0 ? (
              foundUsers.map((user, index) => (
                <div
                  onClick={async (e) => {
                    e.preventDefault();
                    await firebase.getUser(user.uid).then((doc) => {
                      dispatch(setSearchedUser(doc));
                      history.push(`/users/${doc.username}/about`);
                    });
                  }}
                  key={index}
                  className="rounded w-full flex justify-start items-center md:text-base text-sm py-3 cursor-pointer"
                >
                  <img
                    className="rounded h-10 w-10 object-cover ml-5"
                    src={user.profilePicture}
                    alt="profile"
                  ></img>
                  <p className="ml-3 text-sm">{user.username}</p>
                </div>
              ))
            ) : (
              <div className="rounded w-full flex justify-start items-center text-darkP text-sm py-4 px-2 text-left">
                No users found with that username.
              </div>
            )
          ) : (
            <div className="rounded w-full flex justify-start items-center text-darkP text-sm py-4 px-2 text-left">
              Please wait...
            </div>
          )}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          searchUser();
          setOpenSearchResults(true);
        }}
        style={{ paddingTop: '0.2rem', paddingBottom: '0.2rem' }}
        className="px-3 ml-1 text-darkP hover:bg-beige text-center bg-orangeP rounded text-sm"
      >
        Search
      </button>
    </>
  );
  async function searchUser() {
    await firebase.queryUsersCollectionForMatchingUsername(
      searchValue,
      setFoundUsers
    );
  }
};

export default SearchUsers;
