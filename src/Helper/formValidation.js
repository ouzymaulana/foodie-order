export function textFieldImage(file) {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxFileSize = 5 * 1024 * 1024; // 5 MB

  if (!file) {
    return { status: "failed", message: "File is required" };
  }

  if (!allowedFileTypes.includes(file.type)) {
    return {
      status: "failed",
      message: "Invalid file format. Allowed formats: JPEG, PNG, GIF",
    };
  }

  if (file.size > maxFileSize) {
    return {
      status: "failed",
      message: `File size exceeds the maximum limit of 5MB`,
    };
  }

  return { status: "success", message: "success" };
}
