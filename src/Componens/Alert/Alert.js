import Swal from "sweetalert2";

export function Alert(icon, title) {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: "Balance has been added",
    showConfirmButton: false,
    timer: 1300,
  });
}
