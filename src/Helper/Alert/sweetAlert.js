import Swal from 'sweetalert2';

export function sweetAlert(icon, title) {
  return Swal.fire({
    position: 'center',
    icon,
    title,
    showConfirmButton: false,
    timer: 3500,
  });
}
