import { useState, useEffect } from "react";
import RecipeReviewCard from "./components/ImageCard";
import axios from "axios";

function App() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    imageName: "",
    imagePath: "",
    users: "",
    des: "",
  });
  const [search, setSearch] = useState({
    search: "", // Change to "name" for consistency
  });
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:5500/api/upload",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async (e) => {
      // e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5500/test", search);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  const fetchData1 = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      const res = await axios.post("http://localhost:5500/upload", input);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
    setInput({
      imageName: "", // Reset input fields
      imagePath: "",
      users: "",
      des: "",
    });
    setShow(false);
  };

  const handleChange = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.files[0].name }));
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>Fetch</h2>
        <div style={{ textAlign: "center" }}>
          <form>
            <input type="text" name="search" onChange={handleChange} />
            {/* <button onClick={fetchData}>click</button> */}
          </form>
        </div>
        <h3 style={{ textAlign: "center" }}>Upload </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "350px",
            }}
          >
            <label htmlFor="imageName">Image Name</label>
            <input type="text" name="imageName" onChange={handleChange} />
            <label htmlFor="users">Image Author</label>
            <input type="text" name="users" onChange={handleChange} />
            <label htmlFor="des">Image Des</label>
            <input type="text" name="des" onChange={handleChange} />
            <input
              type="file"
              id="file"
              name="imagePath"
              onChange={handleImageChange}
            />
            <button onClick={fetchData1}>Upload</button>
          </form>
        </div>

        <h3 style={{ textAlign: "center" }}>Results</h3>
        {/* {data &&
          data.map((item) => (
            <div key={item.imageName}>
              <img
                style={{ width: "350px" }}
                src={` http://localhost:5500/upload/${item.imagePath}`}
              />
              <p>{item.imageName}</p>
              <p>{item.users}</p>
              <p>{item.des}</p>
            </div>
          ))} */}
      </div>
      <RecipeReviewCard value={data} />
    </>
  );
}

export default App;
