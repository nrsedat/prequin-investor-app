import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
// import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Investor {
  firm_id: number;
  firm_name: string;
  firm_type: string;
  date_added: string;
  address: string;
}

const InvestorsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Investor[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<Investor[]>(`/api/investors`);
        setError(false);
        setData(result.data);
      } catch (e) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      {error ? (
        "Something went wrong"
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>FirmId</TableCell>
                <TableCell>FirmName</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>DateAdded</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.firm_id}
                  onClick={() => navigate(`/investors/${item.firm_id}`)}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <TableCell>{item.firm_id}</TableCell>
                  <TableCell>{item.firm_name}</TableCell>
                  <TableCell>{item.firm_type}</TableCell>
                  <TableCell>{item.date_added}</TableCell>
                  <TableCell>{item.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
};

export default InvestorsTable;
