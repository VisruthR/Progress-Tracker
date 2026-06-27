import { useState } from "react";
import "./topbar.css";

function InputBox({ updateList }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("High");

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedText = text.trim();

    const finalOutput = {
      text: cleanedText,
      priority: priority,
    };

    updateList(finalOutput);

    setText("");
    setPriority("HIgh");
  };

  const handleTyping = (e) => {
    const typed = e.target.value;
    setText(typed);
  };

  return (
    <div className="topbar-wrapper">
      <select className="status-dropdown">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
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
