import React from 'react';
import { FiMenu } from 'react-icons/fi';
import logo from './imgs/LogoDark.svg';
import { Link, useHistory } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import { useSelector } from 'react-redux';
import Loader from './../loader/loader';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  let history = useHistory();

  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.currentUser);

  if (
    (firebase.auth.currentUser && currentUser) ||
    !firebase.auth.currentUser
  ) {
    return (
      <>
        <nav className="w-full relative flex flex-wrap items-center justify-between px-2 lg:py-6 py-4 navbar-expand-lg bg-transparent text-darkP text-sm">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <Link to="/">
                <img
                  src={logo}
                  className="w-16 md:w-20 lg:ml-0 md:ml-12 ml-8 cursor-pointer"
                  alt="We Care logo"
                />
              </Link>
              <button
                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <FiMenu className="text-2xl text-darkP" />
              </button>
            </div>
            <div
              className={
                'lg:flex flex-grow items-center justify-center' +
                (navbarOpen ? ' flex' : ' hidden')
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col justify-center lg:flex-row list-none text-center w-full">
                <li className="lg:mr-10 lg:mt-0 lg:py-0 py-3 hover:text-orangeP lg:border-0 border-b border-darkP">
                  <Link to="/profile">{t('Profile')}</Link>
                </li>
                <li className="lg:mr-10 lg:my-0 lg:py-0 py-3 hover:text-orangeP lg:border-0 border-b border-darkP">
                  <Link to="/ForYou">{t('For You')}</Link>
                </li>
                <li className="lg:mr-10 lg:my-0 lg:py-0 py-3 hover:text-orangeP lg:border-0 border-b border-darkP">
                  <Link to="/Counselling">{t('Counselling')}</Link>
                </li>
                {firebase.getCurrentUsername() ? (
                  <li className="lg:mb-0 lg:py-0 py-3 hover:text-orangeP">
                    <Link
                      to="/login"
                      onClick={() => {
                        logout();
                      }}
                    >
                      {t('Sign Out')}
                    </Link>
                  </li>
                ) : (
                  ''
                )}
              </ul>
            </div>
            <div className="lg:flex justify-center items-center hidden">
              <Link to="/profile">
                <img
                  src={currentUser.profilePicture}
                  className="rounded-full h-10 w-10 object-cover"
                  alt="Profile"
                ></img>
              </Link>
              <Link to="/profile">
                <p className="ml-2">{currentUser.username}</p>
              </Link>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return <Loader />;
  }

  async function logout() {
    await firebase.logout();
    history.push('/login');
  }
}
