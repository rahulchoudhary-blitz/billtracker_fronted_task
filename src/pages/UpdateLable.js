import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateLable() {
  const [data, setData] = useState({ lable: "", amount: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  //update function
  const storeData = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/apidata/update/${id}`;
    const updated = await axios.put(url, data);
   if (updated.data.success) {
      navigate("/");
    }
  };
  //get all required fields after click the update
  const getData = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/apidata/getDataById/${id}`;
    const response = await axios.get(url);
    if (response.data.success) {
      setData({ ...response.data.fieldsData });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="product">
      Lable:
      <input
        placeholder="Enter the label name"
        value={data.lable}
        onChange={(e) => setData({ ...data, lable: e.target.value })}
        className="inputBox"
      />
      <br />
      <br />
      Amount:
      <input
        placeholder="Enter the label amount"
        value={data.amount}
        onChange={(e) => setData({ ...data, amount: e.target.value })}
        className="inputBox"
      />
      <button onClick={storeData}>Submit</button>
    </div>
  );
}

export default UpdateLable;
