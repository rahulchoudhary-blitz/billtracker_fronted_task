import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";

function LabelList() {
  const [products, setProducts] = useState([]);
  const [searchBy, setSearchBy] = useState({
    searchFor: "lable",
    from: "",
    to: "",
  });

  const [pageNum, setPageNum] = useState(1);
  const [buttons, setButtons] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  //get data from backend
  const getData = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/apidata/getdata?page=${pageNum}&limit=8`;
    const response = await axios.get(url);
    // console.log(response);
    setProducts([...response.data]);
  };

  const updatePagNum = (num) => {
    setPageNum(num);
  };

  const nextPage = (num) => {
    setPageNum(num + 1);
  };

  useEffect(() => {
    getData();
  }, [pageNum]);

  useEffect(() => {
    if (searchBy.from.length === 0) {
      getData();
    }
  }, [searchBy.from]);

  //delete function
  const deleteFn = async (id) => {
    const url = `${process.env.REACT_APP_BASE_URL}/apidata/delete/${id}`;
    const deleted = await axios.delete(url);
    // console.log(deleted);
    const filteredData = products.filter((value) => {
      if (value._id !== id) {
        return value;
      }
    });
    setProducts([...filteredData]);
  };

  //search function
  const searchLable = async (from) => {
    if (from) {
      if (searchBy.searchFor === "lable") {
        const url = `${process.env.REACT_APP_BASE_URL}/apidata/serach/${searchBy.from}`;
        const response = await axios.get(url);
       if (response.data.searchData.length === 0) {
        } else {
          setProducts([...response.data.searchData]);
        }
      }
      if (searchBy.searchFor === "date") {
        const url = `${process.env.REACT_APP_BASE_URL}/apidata/serachbydate/${searchBy.from}/${searchBy.to}`;
        const response = await axios.get(url);
       if (response.data.searchData.length === 0) {
          setProducts([...response.data.searchData]);
        } else {
          setProducts([...response.data.searchData]);
        }
      }
    } else {
      getData();
    }
  };

  return (
    <>
      <div className="Lable-list">
        <h3>Product List</h3>
        {searchBy.searchFor === "date" ? "From:" : ""}
        <input
          type={searchBy.searchFor === "lable" ? "text" : "date"}
          className="search-product"
          placeholder="Search Product"
          onChange={(e) => {
            setSearchBy({ ...searchBy, from: e.target.value });
          }}
        />
          {searchBy.searchFor === "date" ? (
          <>
            To:
            <input
              type="date"
              className="search-product"
              placeholder="Search Product"
              onChange={(e) => {
                setSearchBy({ ...searchBy, to: e.target.value });
              }}
            />
          </>
        ) : (
          ""
        )}
        <select
          name="select"
          id="select-product"
          value={searchBy.searchFor}
          onChange={(e) =>
            setSearchBy({ ...searchBy, searchFor: e.target.value })
          }
        >
          <option value="lable">Search by Lable</option>
          <option value="date">Search by Date</option>
        </select>
        <button onClick={searchLable}>Search</button>
        <div className="product">
          <table>
            <thead>
              <tr>
                <th>index</th>
                <th>Lable</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((value, index) => {
                  return (
                    <tr key={value.amount + index}>
                      <td>{index + 1}</td>
                      <td>{value.lable}</td>
                      <td>{value.amount}</td>
                      <td>{value.createdAt}</td>
                      <td>
                        <button>
                          <Link to={`/updatelist/${value._id}`}>
                            Update Bill
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteFn(value._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div>
          {buttons &&
            buttons.map((item) => (
              <button className="btn" onClick={() => updatePagNum(item)}>
                {item}
              </button>
            ))}
          <button className="page-link" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default LabelList;
