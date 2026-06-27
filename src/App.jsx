import { useState } from "react";
import Header from "./components/header/Header";
import InputBox from "./components/topbar/Topbar";
import ListContainer from "./components/bottomcard/ListContainer";
import "./App.css";

function App() {
  const [lists, setLists] = useState(() => {
    const savedData = localStorage.getItem("list");
    return savedData != null ? JSON.parse(savedData) : [];
  });

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
    const newInput = {
      id: crypto.randomUUID(),
      title: input.text,
      priority: input.priority,
      isCompleted: false,
    };

    const updatedTasks = [...lists, newInput];

    setLists(updatedTasks);
    localStorage.setItem("list", JSON.stringify(updatedTasks));
  };

  const handleFilter = (text) => {
    setFilter(text);
    console.log(text);
  };

  const handleDelete = (id) => {
    const newList = lists.filter((item) => item.id !== id);

    setLists(newList);
    localStorage.setItem("list", JSON.stringify(newList));
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
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
