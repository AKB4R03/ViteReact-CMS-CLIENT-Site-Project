import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const RESTAURANT_SERVER_URL = "http://localhost:3000";
const restApi = axios.create({
  baseURL: RESTAURANT_SERVER_URL,
});

const TableCategory = () => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [rest, setRest] = useState([]);

  useEffect(() => {
    const fetchRest = async () => {
      try {
        setIsloading(true);
        const { data } = await restApi.get("/category/pub");
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

  if (isLoading) return <p>Loading......Sabar</p>;
  if (error) return <p>error fetching, please try again!!</p>;

  return (
    <>
      <div className="overflow-x-auto px-[500px] py-[200px] shadow-lg">
        <table className="table ">
          <thead>
            <tr>
              <th className="text-white">Name</th>
            </tr>
          </thead>
          <tbody>
            {rest.data.map((el) => (
              <tr key={el.id}>
                <td className="text-white">{el.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableCategory;
