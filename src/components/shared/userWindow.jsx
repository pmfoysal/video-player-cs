import api from '@middlewares/api';
import { Icon } from '@iconify/react';
import studentImg from '../../assets/images/user.png';
import { StoreContext } from '@contexts/storeProvider';
import { useContext, useEffect, useState } from 'react';
import creatorImg from '../../assets/images/creator.png';
import { useLocation, useNavigate } from 'react-router-dom';
import {
   UserWindowContainer,
   UserWindowImage,
   UserWindowImg,
   UserWindowLink,
   UserWindowLinks,
   UserWindowName,
   UserWindowPopup,
   UserWindowRole,
} from './userWindow.styled';

export default function UserWindow() {
   const location = useLocation();
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const { user, setUser } = useContext(StoreContext);
   const student = user?.role === 'student';

   function openHandler() {
      setOpen(prev => !prev);
   }

   async function signoutHandler() {
      await api.post('/auth/signout');
      setUser({});
      window.localStorage.removeItem('userToken');
      window.localStorage.removeItem('user');
      setOpen(false);
      navigate('/signin');
   }

   useEffect(() => {
      setOpen(false);
   }, [location]);

   return (
      <UserWindowContainer>
         <UserWindowImage src={student ? studentImg : creatorImg} alt='user' onClick={openHandler} />
         {open && (
            <UserWindowPopup>
               <UserWindowImg src={student ? studentImg : creatorImg} alt='user' />
               <UserWindowName>{user?.name || 'Unknown'}</UserWindowName>
               <UserWindowRole>{user?.role || 'invalid'}</UserWindowRole>
               <UserWindowLinks>
                  <UserWindowLink onClick={() => navigate('/notifications')}>
                     <Icon icon='bytesize:bell' />
                     Notifications
                  </UserWindowLink>
                  <UserWindowLink danger onClick={signoutHandler}>
                     <Icon icon='mi:log-out' />
                     Signout
                  </UserWindowLink>
               </UserWindowLinks>
            </UserWindowPopup>
         )}
      </UserWindowContainer>
   );
}
