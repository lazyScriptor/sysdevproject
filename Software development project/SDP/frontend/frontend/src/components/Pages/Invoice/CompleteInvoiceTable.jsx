import { Box, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../../../Contexts/Contexts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function CompleteInvoiceTable() {
  const theme = useTheme();
  const [totalCost, setTotalCost] = useState(0);
  const { invoiceObject, setMachineTotalCost } = useContext(InvoiceContext);

  useEffect(() => {
    if (invoiceObject.eqdetails) {
      const newTotalCost = invoiceObject.eqdetails.reduce((acc, row) => {
        if (row.duration_in_days) {
          return (
            acc + row.eq_rental * row.duration_in_days * row.inveq_borrowqty
          );
        }
        return acc;
      }, 0);
      
      setTotalCost(newTotalCost);
      setMachineTotalCost(newTotalCost);
    }
  }, [invoiceObject.eqdetails, setMachineTotalCost]);

  const colorFunction = (durationNumber) => {
    if (durationNumber == null) return theme.palette.primary[50];
  };

  return (
    <Box sx={{ position: "relative", height: "100%", overflowY: "auto" }}>
      <TableContainer
        component={Paper}
        elevation={4}
        sx={{
          borderRadius: 3,
          overflowY: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* Header Cells */}
              <TableCell align="center">තීර අංකය</TableCell>
              <TableCell align="center">භාණ්ඩයේ අංකය</TableCell>
              <TableCell align="center">භාණ්ඩයේ නම</TableCell>
              <TableCell align="center">ගාස්තුව (දිනකට)</TableCell>
              <TableCell align="center">ගෙන ආ දිනය</TableCell>
              <TableCell align="center">ගෙනගිය ප්‍රමාණය</TableCell>
              <TableCell align="center">තබාගත් දින ගනන</TableCell>
              <TableCell align="center">ගෙනදුන් ප්‍රමාණය</TableCell>
              <TableCell align="center">භාණ්ඩය සඳහා මුලු අයකිරීම</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceObject.eqdetails &&
              invoiceObject.eqdetails.map((row, index) => {
                const itemCost =
                  row.eq_rental * row.duration_in_days * row.inveq_borrowqty;
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: colorFunction(row.duration_in_days),
                    }}
                  >
                    <TableCell align="center">{index + 1}#</TableCell>
                    <TableCell align="center">{row.eq_id}</TableCell>
                    <TableCell align="center">{row.eq_name}</TableCell>
                    <TableCell align="center">{row.eq_rental}</TableCell>
                    <TableCell align="center">
                      {row.inveq_return_date == null ? (
                        <FontAwesomeIcon
                          icon={faCircle}
                          beatFade
                          style={{ color: "#FFD43B" }}
                        />
                      ) : (
                        new Date(row.inveq_return_date).toLocaleString()
                      )}
                    </TableCell>
                    <TableCell align="center">{row.inveq_borrowqty}</TableCell>
                    <TableCell align="center">{row.duration_in_days}</TableCell>
                    <TableCell align="center">
                      {row.inveq_return_quantity === 0
                        ? ""
                        : row.inveq_return_quantity}
                    </TableCell>
                    <TableCell align="center" sx={{ backgroundColor: theme.palette.primary[50] }}>
                      {row.duration_in_days ? `රු. ${itemCost}` : ""}
                    </TableCell>
                  </TableRow>
                );
              })}
            {/* Row to display total */}
            <TableRow>
              <TableCell colSpan={8} align="right" sx={{ fontWeight: 'bold' }}>
                මුලු අයකිරීම
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary[100] }}>
                {`රු. ${totalCost}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CompleteInvoiceTable;
