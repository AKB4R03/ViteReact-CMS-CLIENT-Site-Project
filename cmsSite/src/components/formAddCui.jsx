import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RESTAURANT_SERVER_URL = "http://localhost:3000";
const restApi = axios.create({
  baseURL: RESTAURANT_SERVER_URL,
});

const FormAddCuisine = () => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [rest, setRest] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    categoryId: "",
    authorId: "",
  });
  useEffect(() => {
    const fetchRest = async () => {
      try {
        setIsloading(true);
        const { data } = await restApi.get("/category/pub");
        setRest(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsloading(false);
      }
    };
    fetchRest();
  }, []);

  if (isLoading) return <p>Loading......Sabar</p>;
  if (error) return <p>error fetching, please try again!!</p>;

  const onChangeHandle = (e) => {
    const value = e.target.value;
    const key = e.target.name;

    setInput({
      ...input,
      [key]: value,
    });
  };
  // console.log(input, "================");
  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      const accessToken = localStorage.getItem("access_token");

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      // console.log(input, "=================2");
      await restApi.post("/cuisine", input, { headers });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="bg-slate-800  py-24">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-2xl">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add Cuisine
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={onSubmitHandle}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name cuisine
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="cosang"
                    value={input.name}
                    onChange={onChangeHandle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id=""
                    cols="30"
                    rows="5"
                    placeholder="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={input.description}
                    onChange={onChangeHandle}
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price cuisine
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="500"
                    value={input.price}
                    onChange={onChangeHandle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="imgUrl"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image cuisine
                  </label>
                  <input
                    type="text"
                    name="imgUrl"
                    id="imgUrl"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={input.imgUrl}
                    onChange={onChangeHandle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="imgUrl"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    name="categoryId"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={input.categoryId}
                    onChange={onChangeHandle}
                  >
                    <option value="" disabled>
                      Category
                    </option>
                    {rest.data.map((el) => (
                      <option value={el.id} key={el.id}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="authorId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Author
                  </label>
                  <input
                    type="number"
                    name="authorId"
                    id="authorId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={input.authorId}
                    onChange={onChangeHandle}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline btn-default my-5 text-black"
                >
                  Add Cuisine
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormAddCuisine;
