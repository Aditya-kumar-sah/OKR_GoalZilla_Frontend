import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return <div>
    <div>Count: {count}</div>
    <button onClick={increment}>Increment</button>
    {count > 0 && <button onClick={decrement}>decrement</button>}
  </div>;
};

export default App;
