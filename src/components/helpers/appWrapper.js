import Toaster from './toaster';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import StoreProvider from '@contexts/storeProvider';
import ThemeProvider from '@contexts/themeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function AppWrapper({ children }) {
   useEffect(() => {
      const author = {
         username: 'pmfoysal',
         name: 'Foysal Ahmmed',
         email: 'pmfoysal@gmail.com',
         github: 'https://github.com/pmfoysal',
         facebook: 'https://facebook.com/pmfoysalz',
      };
      window.localStorage.setItem('author', JSON.stringify(author));
   }, []);

   return (
      <React.Fragment>
         <ThemeProvider>
            <QueryClientProvider client={queryClient}>
               <StoreProvider>
                  <BrowserRouter>
                     {children}
                     <Toaster />
                  </BrowserRouter>
               </StoreProvider>
            </QueryClientProvider>
         </ThemeProvider>
      </React.Fragment>
   );
}
