import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const RESTAURANT_SERVER_URL = "http://localhost:3000";
const restApi = axios.create({
  baseURL: RESTAURANT_SERVER_URL,
});

const UploadForm = () => {
  const [sendFile, setSendFile] = useState();
  const [rest, setRest] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const { data } = await restApi.get(`/cuisine/${id}`, { headers });
        setRest(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleOnChange = (e) => {
    const inputFile = e.target.files[0];

    console.log(inputFile);

    setSendFile(inputFile);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("imgData", sendFile);

    const accessToken = localStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await restApi.patch(`/upload/${id}`, formData, {
        headers,
      });

      navigate("/home");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <section className="bg-slate-800">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-2xl">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Upload Image
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleOnSubmit}
              >
                <img
                  className="w-full rounded-box"
                  src="https://ik.imagekit.io/q7pvfvakd/download_fzKMvrwNK.jpeg?updatedAt=1699032991278"
                  alt=""
                />
                <div className="font-bold text-xl mb-2">{rest.name} </div>

                <div className="upload-container relative flex items-center justify-between w-full">
                  <div className="drop-area w-full rounded-md border-2 border-dotted border-gray-200 transition-all hover:border-blue-600/30 text-center">
                    <label
                      htmlFor="file-input"
                      className="block w-full h-full text-gray-500 p-4 text-sm cursor-pointer"
                    >
                      Drop your image here or click to browse
                    </label>
                    <input
                      type="file"
                      id="file-input"
                      accept="image/*"
                      className="hidden"
                      onChange={handleOnChange}
                    />
                    {/* <!-- Image upload input --> */}
                    {/* <div className="preview-container hidden items-center justify-center flex-col">
                      <div className="preview-image w-36 h-36 bg-cover bg-center rounded-md"></div>
                      <span className="file-name my-4 text-sm font-medium"></span>
                      <p className="close-button cursor-pointer transition-all mb-4 rounded-md px-3 py-1 border text-xs text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                        Delete
                      </p>
                    </div> */}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-outline btn-default my-5 text-black"
                >
                  Update Cuisine
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadForm;
