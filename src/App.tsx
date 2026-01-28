import React, { useState } from "react";
const App = () => {
  const [formData, setFormData] = useState(
    {
      objective: "",
      keyResult: ""
    }
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    setFormData({
      objective: "",
      keyResult: ""
    });
  }
  const handleClear = () => {
    setFormData({
      objective: "",
      keyResult: ""
    })
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
            value={formData.objective}
            onChange={handleChange} />
        </div>
        <div className="flex flex-col w-full  items-center py-2">
          <label className="font-bold ">Key Result</label>
          <input
            type="text"
            name="keyResult"
            placeholder="Enter Key Result"
            required
            className="border w-[70%] h-10  rounded p-2"
            value={formData.keyResult}
            onChange={handleChange} />
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
