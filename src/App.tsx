import  { useState } from "react";
const App = () => {

  const [objective, setObjective] = useState("");
  const [keyResult, setKeyResult] = useState("");


  const handleSubmit = (e:any) => {
    console.log({ objective, keyResult })
    e.preventDefault();
    handleClear();
  }
  const handleClear = () => {
    setObjective("");
    setKeyResult("");
  }

  return <div className="w-100 h-100 m-auto mt-5  rounded bg-gray-100 shadow-md">
    <form onSubmit={handleSubmit}>

      <div className="flex flex-col gap-2 w-full h-75 items-center justify-center ">
        <div className="flex flex-col w-full  items-center py-2">
          <label className="font-bold">Objective</label>
          <input
            type="text"
            name="objective"
            placeholder="Enter Objective"
            required
            className="border w-[70%] h-10 rounded p-2"
            value={objective}
            onChange={(e) => setObjective(e.target.value)} />
        </div>
        <div className="flex flex-col w-full  items-center py-2">
          <label className="font-bold ">Key Result</label>
          <input
            type="text"
            name="keyResult"
            placeholder="Enter Key Result"
            required
            className="border w-[70%] h-10  rounded p-2"
            value={keyResult}
            onChange={(e) => setKeyResult(e.target.value)} />
        </div>
      </div>

      <div className="w-full flex gap-1 justify-around font-semibold">
        <button
          type="submit"
          className="border p-2 w-20 bg-green-400 rounded hover:bg-green-100 ">Submit</button>
        <button
          onClick={handleClear}
          className="border p-2 w-20 bg-gray-400 rounded  hover:bg-gray-100">Clear</button>
      </div>
    </form>

  </div>;
}

export default App;
