import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RESTAURANT_SERVER_URL = "http://localhost:3000";
const restApi = axios.create({
  baseURL: RESTAURANT_SERVER_URL,
});

const Detail = () => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [rest, setRest] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log(id);
  useEffect(() => {
    const fetchRest = async () => {
      try {
        setIsloading(true);
        const { data } = await restApi.get(`/cuisine/${id}/pub`);
        setRest(data);
      } catch (error) {
        console.log(error);
        setError(err);
      } finally {
        setIsloading(false);
      }
    };
    fetchRest();
  }, []);
  const handleClick = (e) => {
    e.preventDefault;
    navigate("/");
  };
  return (
    <>
      {/* {console.log(rest)} */}
      <section className="bg-slate-900 pb-48">
        <div className="py-24 px-[500px]">
          <div
            className="max-w-sm rounded-box overflow-hidden shadow-lg bg-slate-700 "
            key={rest?.data?.id}
          >
            <img
              className="w-full max-h-48 object-cover"
              src={rest?.data?.imgUrl}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-white">
                {rest?.data?.name}
              </div>
              <p className="text-white">{rest?.data?.description}</p>
              <p className="text-white">{rest?.data?.price}</p>
              <button
                className="btn btn-outline btn-default my-5 text-white"
                onClick={handleClick}
              >
                Pesan
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
