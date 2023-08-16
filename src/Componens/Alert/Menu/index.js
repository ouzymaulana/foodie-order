import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { alertHandleStatus } from '..';

export async function isConfirmedDelete(
  dispatch,
  deleteDataByIdMenu,
  id,
  replace,
  asPath
) {
  const token = Cookies.get('token');
  try {
    const response = await axios.delete(
      'http://localhost:5000/api/admin/menu/delete',
      {
        data: { id },
        // data: { id: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === 'success') {
      dispatch(deleteDataByIdMenu(id));
      alertHandleStatus('Deleted!', 'Your Menu has been deleted.', 'success');
      replace(asPath);
    }
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export function deleteMenuAlert(
  dispatch,
  deleteDataByIdMenu,
  id,
  replace,
  asPath
) {
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
      isConfirmedDelete(dispatch, deleteDataByIdMenu, id, replace, asPath);
    }
  });
}
