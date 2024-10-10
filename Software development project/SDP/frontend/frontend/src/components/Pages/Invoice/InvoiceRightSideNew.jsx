import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import { InvoiceContext } from "../../../Contexts/Contexts";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import MousePopOver from "../../SubComponents/AlertComponents/MousePopOver";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTheme } from "@emotion/react";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
function InvoiceRightSideNew() {
  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
  };
  const theme = useTheme();
  const [idFormData, setIdFormData] = useState({
    id: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
  });
  const [idErrors, setIdErrors] = useState({});
  const [eqErrors, setEqErrors] = useState({});
  const [eqQuantity, setEqQuantity] = useState(0);
  const [eqName, setEqName] = useState("");
  const [eqFullDetail, setEqFullDetail] = useState("");
  const [addButtonDisable, setAddButtonDisable] = useState(false);
  const [stockTextColor, setStockTextColor] = useState("black");

  function dateformatter() {
    const createdDate = new Date();

    const year = createdDate.getFullYear();
    const month = String(createdDate.getMonth() + 1).padStart(2, "0");
    const day = String(createdDate.getDate()).padStart(2, "0");

    const hours = String(createdDate.getHours()).padStart(2, "0");
    const minutes = String(createdDate.getMinutes()).padStart(2, "0");
    const seconds = String(createdDate.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const {
    responseManageToogle,
    setResponseManageToogle,
    eqObject,
    setEqObject,
    updateValue,
    updateEqObject,
  } = useContext(InvoiceContext);

  const handleIdChange = (e) => {
    const { name, value } = e.target;
    setIdFormData({
      ...idFormData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setIdErrors({});
    setEqErrors({});
    setStockTextColor("black");
    setEqName("");
    setEqQuantity("");
    setEqObject([]);
    setFormData({ name: "", quantity: "" });
    setIdFormData({ id: "" });
  };

  const handleSubmitId = async (e) => {
    setEqErrors({});
    e.preventDefault();
    const validationErrors = {};

    if (!idFormData.id.trim()) {
      validationErrors.id = "අංකයක් ඇතුලත් කරන්න";
    } else if (!/^\d+$/.test(idFormData.id.trim())) {
      validationErrors.id = "අකුරු සහ අනෙකුත් ලකුනු ඉවත් කරන්න";
    }
    setIdErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.get(
          `http://localhost:8085/getEquipmentbyID/${idFormData.id}`
        );

        const equipment = res.data[0];
        if (res.data.length > 0) {
          setEqQuantity(
            equipment.eq_completestock - equipment.eq_defected_status
          );
          setEqName(equipment.eq_name);
          setEqFullDetail(equipment);
          setAddButtonDisable(false);
        } else {
          setEqName("");
          setEqQuantity(0);
        }
      } catch (error) {
        console.error("Error occurred while searching by ID:", error);
      }
    }
  };

  useEffect(() => {
    if (formData.quantity > eqQuantity) {
      setStockTextColor("red");
    } else {
      setStockTextColor("black");
    }
  }, [formData.quantity, eqQuantity]);

  const validateForm = () => {
    const validationErrors = {};
    if (!idFormData.id.trim()) {
      validationErrors.id = "අංකය ඇතුලත් කරන්න";
    }
    if (!eqName.trim()) {
      validationErrors.quantity = "ප්‍රථමයෙන් භාණ්ඩය search කරන්න";
    } else if (!formData.quantity.trim()) {
      validationErrors.quantity = "කරුනාකර ලබාගන්න භාණ්ඩ ප්‍රමානය සඳහන් ";
    } else if (parseInt(formData.quantity.trim(), 10) > eqQuantity) {
      validationErrors.quantity = "ලබාගන්නා භාණ්ඩ ප්‍රමාණය තොගය ඉක්මවිය නොහැක";
    } else if (!/^\d+$/.test(formData.quantity.trim())) {
      validationErrors.quantity = "කරුණාකර අංක පමණක් ඇතුලත් කරන්න";
    } else if (formData.quantity <= 0) {
      validationErrors.quantity = "ලබාගන්නා භාණ්ඩ ප්‍රමාණය 0 ට වැඩි විය යුතුය";
    }
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setEqErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      updateEqObject({ ...eqFullDetail, inveq_borrowqty: formData.quantity });
      eqFullDetail.inveq_borrowqty = parseInt(formData.quantity);
      eqFullDetail.inveq_borrow_date = dateformatter();
      setAddButtonDisable(true);
      updateValue("eqdetails", eqFullDetail);
    }
  };

  const handleHandover = () => {
    const validationErrors = validateForm();
    setEqErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("This is the data", dateformatter());
      // Add your handover logic here, similar to handleSubmit
    }
  };

  return (
    <Paper
      sx={{
        height: "55vh",
        width: "100%",
        p: 4,
        borderRadius: 4,
        position: "relative",
      }}
      elevation={3}
    >
      <form noValidate onSubmit={handleSubmitId}>
        <Box ml={-2} mt={-2}>
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            style={{ fontSize: "2.8rem", color: theme.palette.primary[100] }}
          />
        </Box>

        <Box sx={{ display: "flex", height: "80px" }}>
          <FormLabel
            sx={{
              pt: 2,
              pr: 2,
              width: "15%",
              display: "flex",
              justifyContent: "end",
            }}
            htmlFor="id"
          >
            අංකය
          </FormLabel>
          <TextField
            sx={textFieldStyle}
            id="id"
            name="id"
            value={idFormData.id}
            type="text"
            onChange={handleIdChange}
            error={!!idErrors.id}
            helperText={idErrors.id && idErrors.id}
          />
          <Button
            sx={{ width: "20px", height: "57px" }}
            type="submit"
            onClick={() => {
              setEqName("");
              setEqQuantity("");
            }}
          >
            <YoutubeSearchedForIcon />
          </Button>
        </Box>
      </form>

      <form noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} marginTop={2}>
          <Box sx={{ display: "flex", height: "80px" }}>
            <FormLabel
              sx={{
                pt: 2,
                pr: 2,
                width: "17%",
                display: "flex",
                justifyContent: "end",
              }}
              htmlFor="name"
            >
              නම
            </FormLabel>
            <TextField
              disabled={true}
              fullWidth
              id="name"
              sx={textFieldStyle}
              label={eqName}
              name="name"
              type="text"
              value={eqName}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ display: "flex", height: "80px" }}>
            <FormLabel
              sx={{
                pt: 2,
                pr: 2,
                width: "15%",
                display: "flex",
                justifyContent: "end",
              }}
              htmlFor="quantity"
            >
              ප්‍රමාණය
            </FormLabel>
            <TextField
              fullWidth
              sx={textFieldStyle}
              size=""
              value={formData.quantity}
              disabled={addButtonDisable}
              id="quantity"
              label={["ලබාගන්නා භාණ්ඩ ප්‍රමානය ඇතුලත් කරන්න"]}
              name="quantity"
              type="number"
              onChange={handleChange}
              error={!!eqErrors.quantity}
              helperText={eqErrors.quantity && eqErrors.quantity}
            />
          </Box>
          <Typography
            sx={{
              backgroundColor: (theme) => theme.palette.primary[50],
              p: 1.3,
              width: "180px",
              borderRadius: 3,
            }}
            variant="body2"
            color={stockTextColor}
            textAlign={"left"}
          >
            මුලු භාණ්ඩ ප්‍රමාණය: {eqQuantity}
          </Typography>

          <Box
            position={"absolute"}
            display={"flex"}
            flexDirection={""}
            alignItems={"center"}
            sx={{
              gap: 2,
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Button
              disabled={addButtonDisable}
              variant="contained"
              customvariant="custom"
              type="submit"
            >
              ඇතුලත් කරන්න
            </Button>
            {addButtonDisable && (
              <MousePopOver
                message={
                  <InfoOutlinedIcon
                    fontSize="2"
                    sx={{
                      borderRadius: 2,
                      border: "solid 1px",
                      color: (theme) => theme.palette.primary[200],
                      transition: "1900 ease-in-out",
                    }}
                  />
                }
                popOverContent={`ප්‍රථමයෙන් උපකරණ අංකය ඇතුලත් කරන්න`}
              />
            )}
            <Button color="error" customvariant="custom" onClick={handleReset}>
              ඉවත් කරන්න
            </Button>
          </Box>
          {/* <Button
              variant="contained"
              color="warning"
              customvariant="custom"
              onClick={handleHandover}
            >
              Handover
            </Button> */}
        </Stack>
      </form>
    </Paper>
  );
}

export default InvoiceRightSideNew;
