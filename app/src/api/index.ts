import axios from 'axios';

export const validateNumber = async (number: string) => {
  const res = await axios.get('/api/validate', {
    responseType: 'json',
    timeout: 3000,
    params: {
      number,
    },
  });

  if (res.status === 200) {
    return { success: true, data: res.data };
  }

  var { error } = res.data;
  return { success: false, error };
}
