import TableCategory from "../components/categoryTable";
import TableCusine from "../components/tableCuisine";
const Home = () => {
  return (
    <>
      <section className="bg-slate-800">
        <TableCusine />
        <TableCategory />
      </section>
    </>
  );
};

export default Home;
