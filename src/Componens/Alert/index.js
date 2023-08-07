import theme from "@/Helper/theme";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export function Alert(icon, title) {
  return Swal.fire({
    position: "center",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 3000,
  });
}

export function alertHandleStatus(title, text, icon) {
  // Swal.fire("Deleted!", "Your Menu has been deleted.", "success");
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: "#FAA41A",
  });
}
