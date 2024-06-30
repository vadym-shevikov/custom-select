import { Select } from "../components/Select/Select";
import { Header } from "../components/Header/Header";

function Home() {
  const onChange = (option) => {
    console.log("Selected option", option);
  };

  return (
    <>
      <Header />
      <Select onChange={onChange} />
    </>
  );
}

export default Home;
