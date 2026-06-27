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
  const [filter, setFilter] = useState("All");

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

  const updateList = (input) => {
    setLists([
      ...lists,
      {
        id: crypto.randomUUID(),
        title: input.text,
        priority: input.priority,
        isCompleted: false,
      },
    ]);
  };

  const handleFilter = (text) => {
    setFilter(text);
    console.log(text);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <InputBox updateList={updateList} onFilter={handleFilter} />
        <hr className="divider" />
        <ListContainer
          lists={lists}
          onToggle={handleCheckBox}
          filter={filter}
        />
      </main>
    </div>
  );
}

export default App;
