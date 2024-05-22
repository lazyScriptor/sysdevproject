import React, { useContext, useEffect, useState } from "react";
import "../Stylings/rootstyles.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";
import { Box } from "@mui/material";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../imagedbfirebase";

function Customers() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "EquipmentImages/");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      setIsAuthenticated(false);
    }
  }, [navigate, setIsAuthenticated]);

  const handleUpload = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `EquipmentImages/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
      alert("Image uploaded");
    });
  };

  useEffect(() => {
    const fetchImages = async () => {
      const response = await listAll(imageListRef);
      const urls = await Promise.all(
        response.items.map((item) => getDownloadURL(item))
      );
      setImageList(urls);
    };
    fetchImages();
  }, []);

  return (
    <>
      <Box id="main-body">
        <Box id="body">
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <button onClick={handleUpload}>Upload</button>
          {imageList.map((url, index) => (
            <img key={index} src={url} alt="Equipment" />
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Customers;
