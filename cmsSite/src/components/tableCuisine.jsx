import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const RESTAURANT_SERVER_URL = "http://localhost:3000";
const restApi = axios.create({
  baseURL: RESTAURANT_SERVER_URL,
});

const TableCusine = () => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [rest, setRest] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRest = async () => {
      try {
        setIsloading(true);
        const accessToken = localStorage.getItem("access_token");

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const { data } = await restApi.get("/cuisine", { headers });
        setRest(data);
        // console.log(rest);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsloading(false);
      }
    };
    fetchRest();
  }, []);

  const handleOnClick = async (id) => {
    const accessToken = localStorage.getItem("access_token");
    console.log(id);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    await restApi.delete(`/cuisine/${id}`, { headers });

    const { data } = await restApi.get("/cuisine", { headers });
    setRest(data);
    // setRest(data);
    navigate("/home");
    // fetchRest();
    console.log(data);
  };

  const handleOnclickUpdate = (id) => {
    navigate(`/updateCuisine/${id}`);
  };

  const handleOnclickUpload = (id) => {
    navigate(`/uploadImage/${id}`);
  };

  if (isLoading) return <p>Loading......Sabar</p>;
  if (error) return <p>error fetching, please try again!!</p>;
  return (
    <>
      {/* {console.log(rest.data.rows)} */}
      <div className="overflow-x-auto  px-64 py-[200px]">
        <table className="table ">
          <thead>
            <tr>
              <th className="text-white">Name</th>
              <th className="text-white">Description</th>
              <th className="text-white">Price</th>
              <th className="text-white">ImgURL</th>
              <th className="text-white">CategoryId</th>
              <th className="text-white">AuthorId</th>
              <th className="text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {rest?.data?.map((el) => (
              <tr key={el.id}>
                <td className="text-white">{el.name}</td>
                <td className="text-white">{el.description}</td>
                <td className="text-white">{el.price}</td>
                <td className="text-white">{el.imgUrl}</td>
                <td className="text-white">{el.categoryId}</td>
                <td className="text-white">{el.authorId}</td>
                <td>
                  <div>
                    <button
                      className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group "
                      onClick={() => handleOnClick(el.id)}
                    >
                      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                        Delete
                      </span>
                      <span className="absolute inset-0 border-2 border-white rounded-full"></span>
                    </button>
                    <button
                      className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group "
                      onClick={() => handleOnclickUpload(el.id)}
                    >
                      {/* //! ini liat di repo kak wendy */}
                      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                        Upload
                      </span>
                      <span className="absolute inset-0 border-2 border-white rounded-full"></span>
                    </button>
                    <button
                      className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group "
                      onClick={() => handleOnclickUpdate(el.id)}
                    >
                      {/* //! ini belommmmm !!!!! */}
                      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                        Update
                      </span>
                      <span className="absolute inset-0 border-2 border-white rounded-full"></span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableCusine;
