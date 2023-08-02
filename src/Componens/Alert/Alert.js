import { useIsHasUpdated } from "@/Context/IsHasUpdatedContextProvider";
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
    timer: 3500,
  });
}

export function deleteMenuAlert(
  dispatch,
  deleteDataByIdMenu,
  setIshasUpdated,
  id,
  dataMenu,
  replace
) {
  const token = Cookies.get("token");

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#FAA41A",
    cancelButtonColor: "#FF6666",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          "http://localhost:5000/api/admin/menu/delete",
          {
            data: { id: id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          dispatch(deleteDataByIdMenu(id));
          // Swal.fire("Deleted!", "Your Menu has been deleted.", "success");
          Swal.fire({
            title: "Deleted!",
            text: "Your Menu has been deleted.",
            icon: "success",
            confirmButtonColor: "#FAA41A",
          });

          replace();
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  });
}
