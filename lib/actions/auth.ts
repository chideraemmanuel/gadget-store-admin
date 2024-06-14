import axios from '@/config/axios';
import { AuthReturnTypes } from '@/types';

// export const getCurrentAdminOnServer = async () => {
//   const response = await fetch('http://localhost:5000/api/v1/auth/admin', {
//     credentials: 'include',
//     cache: 'no-store',
//   });

//   console.log(
//     'response not ok from get current admin on server',
//     response.status
//   );
//   console.log(
//     'response not ok from get current admin on server',
//     response.statusText
//   );

//   if (!response.ok) {
//     if (response.status === 401) {
//       throw new Error('Unauthorized');
//     } else if (response.status === 403) {
//       throw new Error('Forbidden');
//     } else if (response.status === 404) {
//       throw new Error('Not found');
//     } else {
//       throw new Error('An error occured while trying to fetch current admin ');
//     }
//   }

//   const promise: Promise<AuthReturnTypes> = response.json();

//   return promise;
// };
export const getCurrentAdminOnServer = async () => {
  return axios.get('http://localhost:5000/api/v1/auth/admin');
};
