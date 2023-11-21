import React, { useEffect, useState } from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from '@trendmicro/react-sidenav';
import { isVisible } from '@testing-library/user-event/dist/utils';
import { compose } from '@reduxjs/toolkit';
import { uiActions } from '../Redux-Store/ui-slice';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuToggle = useSelector((store) => store.ui.menuBar);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const handleToggle = () => {
    dispatch(uiActions.toggleMenuBar());
    console.log('handle toggle function called');
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  let recipientData = useSelector((state) => state.email.recipientData);

  let totalUnread = 0;

  recipientData.forEach((item) => {
    if (item.blue === true) {
      totalUnread = totalUnread + 1;
    }
  });
  const navigateHandler = (path) => {
    navigate(`/Home/${path}`);
  };

  console.log('menuToggle is here', menuToggle);
  return (
    <div className='sidebar-container'>
      <SideNav
        expanded={menuToggle}
        onToggle={handleToggle}
        style={{ marginTop: '53px', height: '100%' }}>
        <SideNav.Toggle />
        <SideNav.Nav
          defaultSelected={
            activeLink === '/Home/compose'
              ? 'compose'
              : activeLink === '/Home/inbox'
              ? 'inbox'
              : activeLink === '/Home/send'
              ? 'send'
              : 'home'
          }>
          <NavItem
            eventKey='compose'
            onClick={() => navigateHandler('compose')}>
            <NavIcon>
              <NavLink activeclassname='active'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='19'
                  height='19'
                  fill='currentColor'
                  className='bi bi-envelope'
                  viewBox='0 0 16 16'>
                  <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z' />
                </svg>
              </NavLink>
            </NavIcon>
            <NavText>
              <NavLink style={{ textDecoration: 'none' }}>Compose</NavLink>
            </NavText>
          </NavItem>

          <NavItem
            eventKey='inbox'
            onClick={() => navigateHandler('inbox')}>
            <NavIcon>
              <NavLink activeclassname='active'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='19'
                  height='19'
                  fill='currentColor'
                  className='bi bi-inbox'
                  viewBox='0 0 16 16'>
                  <path d='M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z' />
                </svg>
              </NavLink>
            </NavIcon>
            <NavText>
              <NavLink style={{ textDecoration: 'none' }}>
                Inbox [Unread{totalUnread}]
              </NavLink>
            </NavText>
          </NavItem>

          <NavItem
            eventKey='send'
            onClick={() => navigateHandler('send')}>
            <NavIcon>
              <NavLink activeclassname='active'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='19'
                  height='19'
                  fill='currentColor'
                  className='bi bi-send'
                  viewBox='0 0 16 16'>
                  <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z' />
                </svg>
              </NavLink>
            </NavIcon>

            <NavText>
              <NavLink
                to='/Home/send'
                className='nav-link'
                activeclassname='active'>
                Send
              </NavLink>
            </NavText>
          </NavItem>

          <NavItem eventKey='starred'>
            <NavIcon>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='19'
                height='19'
                fill='currentColor'
                className='bi bi-star'
                viewBox='0 0 16 16'>
                <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
              </svg>
            </NavIcon>
            <NavText>Starred</NavText>
          </NavItem>

          <NavItem eventKey='settings'>
            <NavIcon>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-gear'
                viewBox='0 0 16 16'>
                <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z' />
                <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z' />
              </svg>
            </NavIcon>
            <NavText>Settings</NavText>
          </NavItem>

          <NavItem eventKey='bin'>
            <NavIcon>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='19'
                height='19'
                fill='currentColor'
                className='bi bi-trash'
                viewBox='0 0 16 16'>
                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                <path
                  fillRule='evenodd'
                  d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                />
              </svg>
            </NavIcon>
            <NavText>Bin</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

export default Sidebar;
