import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const navigate = useNavigate();
  const [inputNum, setInputNum] = useState();

  const handleOnClick = (num) => {
    navigate(`/${num}`);
    // console.log(inputNum, "==========================");
  };

  return (
    <>
      <div className="dropdown dropdown-top  px-[600px]">
        <label tabIndex={0} className="btn m-1">
          filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li onClick={() => handleOnClick(1)}>
            <a>Desserts</a>
          </li>
          <li onClick={() => handleOnClick(2)}>
            <a>Main Courses</a>
          </li>
          <li onClick={() => handleOnClick(3)}>
            <a>Snacks</a>
          </li>
          <li onClick={() => handleOnClick(4)}>
            <a>Beverages</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Filter;
