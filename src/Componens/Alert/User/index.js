import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { alertHandleStatus } from '..';

export async function isConfirmedDeleteUser(id, replace, asPath) {
  const token = Cookies.get('token');

  try {
    const response = await axios.delete(
      'http://localhost:5000/admin/user/delete',
      {
        data: { id },
        // data: { id: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === 'success') {
      alertHandleStatus('Deleted!', 'Your User has been deleted.', 'success');
      replace(asPath);
    }
  } catch (error) {
    console.error(error);
  }
}

export function deleteUserAlert(id, replace, asPath) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FAA41A',
    cancelButtonColor: '#FF6666',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      isConfirmedDeleteUser(id, replace, asPath);
    }
  });
}
