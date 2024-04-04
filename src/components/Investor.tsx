import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Commitment {
  id: 16912;
  asset_class: "pd";
  firm_id: 2670;
  currency: "HKD";
  amount: "44M";
}

const ASSET_CLASSES = {
  pe: "Private Equity",
  pd: "Private Debt",
  re: "Real Estate",
  inf: "Infrastructure",
  nr: "Natural Resources",
  hf: "Hedge Funds",
};

const Investor = () => {
  const { id } = useParams<{ id: string }>();
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [assetClass, setAssetClass] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const handleChange = async (event: { target: { value: string } }) => {
    setAssetClass(event.target.value as string);
    try {
      setHasError(false);
      const result = await axios.get<Commitment[]>(
        `/api/investor/commitment/${event.target.value as string}/${id}`
      );
      setCommitments(result.data);
    } catch (e) {
      setHasError(true);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <FormControl fullWidth>
        <InputLabel id="asset-class-select-label">Asset Class</InputLabel>
        <Select
          placeholder="Select an asset class"
          labelId="asset-class-select-label"
          id="asset-class-select"
          value={assetClass}
          label="Asset Class"
          onChange={handleChange}
        >
          {Object.keys(ASSET_CLASSES).map((assetKey) => (
            <MenuItem value={assetKey} key={assetKey}>
              {ASSET_CLASSES[assetKey as keyof typeof ASSET_CLASSES]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {hasError ? (
        "Something went wrong"
      ) : (
        <div>
          {commitments.map((commitment) => (
            <Card sx={{ minWidth: 275 }} key={commitment.id}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {commitment.amount} {commitment.currency}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Investor;
