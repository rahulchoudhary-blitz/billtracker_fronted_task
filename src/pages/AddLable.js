import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddLable() {
  const [lable, setLable] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState();

  const navigate = useNavigate();
//send data to backend
  const storeData = async () => {
    const data = {
      lable,
      amount
};
   const url = `${process.env.REACT_APP_BASE_URL}/apidata/addlable`;
    let result = await axios.post(url, data);
    navigate('/');
  }
//handle csv file data
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BASE_URL}/uploadcsv`;
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      if (response.data) {
        // console.log(response.data);
        navigate('/');
      }
    });
  }

  return (
    <>
      <div className='product'>
        Lable:
        <input placeholder='Enter the label name' value={lable} onChange={(e) => setLable(e.target.value)} className="inputBox" />
        Amount:
        <input placeholder='Enter the label amount' value={amount} onChange={(e) => setAmount(e.target.value)} className="inputBox" />
        <button onClick={storeData} className="appButton">Save</button>
      </div>
      <div>
        <form>
          <h1>Bulk Csv</h1>
          <div className="input-group">
            <label for='files'>Select files</label>

            <input type='file' name='file' onChange={(e) => { setFile(e.target.files[0]) }} required />
          </div>
          <button type='submit' className="submit-btn" onClick={(e) => { handleSubmit(e) }}>Upload</button>
        </form>
      </div>
    </>

  )
}

export default AddLable;
