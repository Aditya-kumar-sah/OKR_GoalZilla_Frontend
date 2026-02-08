import Home from "./components/Home.tsx";
import OkrListProvider from "./context/OkrProvider.tsx";

const App = () => {
  return (
     <>
       <OkrListProvider>
         <Home />;
       </OkrListProvider>
     </>
  )
};
export default App;
