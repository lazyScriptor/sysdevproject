import React, { useState } from "react";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../imagedbfirebase";
import { Alert } from "@mui/material";
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const UserImageUpload = ({ username }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State to store the image URL after upload
  const [showConfirmButton, setShowConfirmButton] = useState(false); // State to control the visibility of the confirm button

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setShowConfirmButton(true); // Show the confirm button when an image is selected
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setSnackbarMessage("Please select an image to upload.");
      setOpenSnackbar(true);
      return;
    }

    const storageRef = ref(storage, `UserImages/${username}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setSnackbarMessage("Failed to upload image. Please try again.");
        setOpenSnackbar(true);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(downloadURL);
        setSnackbarMessage("Image uploaded successfully.");
        setOpenSnackbar(true);
        setUploading(false);
        setShowConfirmButton(false); // Hide the confirm button after successful upload
        setImage(null); // Clear the selected image
        window.location.reload();
      }
    );

    setUploading(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div style={{display:"flex",width:"160px"}}>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id={`upload-button-${username}`}
        onChange={handleFileChange}
      />
      {!uploading && !showConfirmButton && (
        <label htmlFor={`upload-button-${username}`}>
          <Button
            component="span"
            disabled={uploading}
            sx={{ mt: 1, color: (theme) => theme.palette.primary[500] }}
          >
            <CloudUploadTwoToneIcon />
          </Button>
        </label>
      )}
      {showConfirmButton && (
        <Button
          onClick={handleUpload}
          disabled={uploading}
          sx={{ ml: 1, mt: 1 }}
        >
          <FontAwesomeIcon icon={faCheck} beat />
        </Button>
      )}
      {uploading && (
        <div style={{ marginTop: "8px" }}>
          <CircularProgress variant="determinate" value={uploadProgress} />
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserImageUpload;
