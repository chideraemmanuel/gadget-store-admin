'use server';

import axios from '@/config/axios';
import { revalidatePath } from 'next/cache';

interface ReturnTypes {
  data: { message: string } | null;
  error: string | null;
}

export const deleteBillboardOnServer = async (billboardId: string) => {
  //   const response = await fetch(
  //     `http://localhost:5000/api/v1/billboards/${billboardId}`,
  //     { method: 'DELETE', credentials: 'include' }
  //   );

  //   if (!response.ok) {
  //     console.log('respose not ok from deleteBillboardOnServer', response);
  //     throw new Error('An error occured while deleting billboard by id');
  //   }

  const returnObject = {} as ReturnTypes;

  try {
    const data = await axios.delete(
      `http://localhost:5000/api/v1/billboards/${billboardId}`
    );

    returnObject.data = data.data;
    returnObject.error = null;
  } catch (error: any) {
    console.log('[BILLBOARD_DELETION_ERROR]:', error);
    returnObject.data = null;
    returnObject.error = error?.response?.data?.error || error?.message;
  }

  revalidatePath('dashboard/billboards');

  return returnObject;
};
