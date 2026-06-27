import { useState } from "react";
import Header from "./components/header/Header";
import InputBox from "./components/topbar/Topbar";
import ListContainer from "./components/bottomcard/ListContainer";
import "./App.css";

function App() {
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "Plan my next React app",
      priority: "High",
      isCompleted: true,
    },

    {
      id: 2,
      title: "Sleep",
      priority: "Low",
      isCompleted: false,
    },
  ]);

  const handleCheckBox = (id) => {
    setLists(
      lists.map((list) => {
        if (id === list.id) {
          return { ...list, isCompleted: !list.isCompleted };
        }
        return list;
      }),
    );
  };

  return (
    <div className="App">
      <Header />
      <main>
        <InputBox />
        <ListContainer lists={lists} onToggle={handleCheckBox} />
      </main>
    </div>
  );
}

export default App;
