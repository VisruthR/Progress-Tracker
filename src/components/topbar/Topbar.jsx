import { useState } from "react";
import "./topbar.css";

function InputBox({ updateList, onFilter }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("High");

  function capitalizeWordsRegex(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedText = text.trim();

    if (cleanedText === "") {
      setText("");
      return;
    }

    const finalOutput = {
      text: capitalizeWordsRegex(cleanedText),
      priority: priority,
    };

    updateList(finalOutput);

    setText("");
    setPriority("High");
  };

  const handleTyping = (e) => {
    const typed = e.target.value;
    setText(typed);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;

    onFilter(value);
  };

  return (
    <div className="topbar-wrapper">
      <select className="status-dropdown" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <form action="" className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type Any Task..."
          required
          autoCorrect="on"
          autoFocus
          onChange={handleTyping}
          value={text}
        />
        <select
          className="status-dropdown priority"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className="add" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default InputBox;
