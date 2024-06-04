import React, { useContext } from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import Swal from "sweetalert2"; // Assuming you have SweetAlert installed
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { Fab } from "@mui/material";
import axios from "axios"; // Import Axios
import { InvoiceContext } from "../../Contexts/Contexts";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function RadioGroupRating() {
  return (
    <StyledRating
      name="feedback-rating"
      defaultValue={3}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
}

export default function FeedBack(props) {
  const {
    fullDetailsEquipmentArray,
    setFullDetailsEquipmentArray,
    checkState,
    setCheckState,
    setPaymentArray,
    eqObject,
    setEqObject,
    invoiceSearchBtnStatus,
    setInvoiceSearchBtnStatus,
    invoiceObject,
    setInvoiceObject,
    clearObject,
    updateValue,
    clearValues,
    updateEqObject,
  } = useContext(InvoiceContext);

  const handleFeedback = () => {
    const container = document.createElement("div");
    createRoot(container).render(<RadioGroupRating />); // Use createRoot to render the component

    Swal.fire({
      title: "Submit your feedback",
      html: `
        <div id="rating-container">How about the customer</div>
        <textarea id="feedback-text" placeholder="Leave your comments regarding the invoice, here..." style="width: 100%; height: 100px;"></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        document.getElementById("rating-container").appendChild(container);
      },
      preConfirm: async () => {
        const rating = document.querySelector('[name="feedback-rating"]').value;
        const comments = document.getElementById("feedback-text").value || "";

        try {
          console.log(rating, comments);
          invoiceObject.inv_rating = rating;
          invoiceObject.inv_special_message = comments;
          return Swal.fire({
            title: "Thank you for your feedback!",
            icon: "success",
          });
        } catch (error) {
          console.error("Error submitting feedback:", error);
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
    });
  };

  return (
    <>
      <Fab variant="extended" onClick={handleFeedback}>
        <InsertCommentOutlinedIcon sx={{ mr: 1 }} />
        Feedback
      </Fab>
    </>
  );
}
