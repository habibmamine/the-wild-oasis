/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get("sortBy") || "";

  function handleClick(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return <Select value={currentValue} options={options} onChange={handleClick} type="white" />;
}

export default SortBy;
