import Swal from "sweetalert2";

export function Alert(icon, title) {
  return Swal.fire({
    position: "center",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 3500,
  });
}
