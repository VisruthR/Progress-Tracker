import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import InputBox from "./components/topbar/Topbar";
import ListContainer from "./components/bottomcard/ListContainer";
import FixedPrompt from "./components/prompt/FixedPrompt";
import "./App.css";

function App() {
  const [lists, setLists] = useState(() => {
    const savedData = localStorage.getItem("list");
    return savedData != null ? JSON.parse(savedData) : [];
  });

  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme != null ? savedTheme : "light";
  });
  const [dateFilter, setDateFilter] = useState("Today");

  const [replayPrompt, setReplayPrompt] = useState(false);
  const [currReplyId, setCurrReplyId] = useState("");

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(lists));
  }, [lists]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleCheckBox = (id) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        // 1. If the clicked item is the main parent task
        if (list.id === id) {
          const newStatus = !list.isCompleted;
          return {
            ...list,
            isCompleted: newStatus,
            // Optional: Mark all subtasks the same status as parent
            replies: (list.replies || []).map((reply) => ({
              ...reply,
              isCompleted: newStatus,
            })),
          };
        }

        // 2. Check if the clicked item is a nested subtask inside this parent
        if (list.replies && list.replies.some((reply) => reply.id === id)) {
          const updatedReplies = list.replies.map((reply) =>
            reply.id === id
              ? { ...reply, isCompleted: !reply.isCompleted }
              : reply,
          );

          // Automatically mark parent complete if ALL subtasks are completed
          const allCompleted =
            updatedReplies.length > 0 &&
            updatedReplies.every((reply) => reply.isCompleted);

          return {
            ...list,
            replies: updatedReplies,
            isCompleted: allCompleted,
          };
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
      replies: [],
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };

    setLists((prevLists) => [...prevLists, newInput]);
  };

  const handleSubmit = (text) => {
    if (!text || !text.trim()) return;

    const newReply = {
      id: crypto.randomUUID(),
      title: text.trim(),
      priority: "Subtask",
      isCompleted: false,
    };

    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === currReplyId) {
          return {
            ...list,
            replies: [...(list.replies || []), newReply],
            isCompleted: false,
          };
        }
        return list;
      }),
    );
  };

  // Adds a nested subtask to a parent task
  const handleAddReply = (parentId) => {
    const show = !replayPrompt;
    setReplayPrompt(show);
    setCurrReplyId(parentId);
  };

  const handleFilter = (text) => {
    setFilter(text);
  };

  const handleDateFilter = (text) => {
    setDateFilter(text);
  };

  const handleDelete = (id) => {
    setLists((prevLists) =>
      prevLists
        .filter((item) => item.id !== id) // Removes if it's a main task
        .map((item) => ({
          ...item,
          // Removes if it's inside replies
          replies: item.replies
            ? item.replies.filter((reply) => reply.id !== id)
            : [],
        })),
    );
  };

  return (
    <div className="App">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <InputBox
          updateList={updateList}
          onFilter={handleFilter}
          onDate={handleDateFilter}
        />
        <hr className="divider" />
        {replayPrompt && (
          <FixedPrompt show={setReplayPrompt} onSubmit={handleSubmit} />
        )}
        <ListContainer
          lists={lists}
          onToggle={handleCheckBox}
          filter={filter}
          onDelete={handleDelete}
          onAdd={handleAddReply}
          dateFilter={dateFilter}
        />
      </main>
    </div>
  );
}

export default App;
