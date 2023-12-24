import Card2 from "../components/card2";
import Filter from "../components/filtering";
import Page from "../components/pagination";
const Home2 = () => {
  return (
    <>
      <div className="bg-slate-900">
        <Page />
        <Filter />
        <Card2 />
      </div>
    </>
  );
};

export default Home2;
