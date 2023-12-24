import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [inputSearch, setInputSearch] = useState({
    searching: "",
  });
  const navigate = useNavigate();

  const handelOnChange = (e) => {
    const value = e.target.value;
    const key = e.target.name;

    setInputSearch({
      ...inputSearch,
      [key]: value,
    });
    // console.log(inputSearch);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(inputSearch);
    // if (inputSearch == undefined) setInputSearch({ search: "" });
    navigate(`/${inputSearch}`);
  };

  return (
    <>
      <div className="navbar bg-slate-800 text-neutral-content shadow-xl">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">KaneBato</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <form onSubmit={handleOnSubmit}>
              <input
                type="text"
                className="input input-bordered w-24 md:w-auto"
                name="searching"
                value={inputSearch.searching}
                onChange={handelOnChange}
              />
              <button className="btn btn-outline">Search</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
