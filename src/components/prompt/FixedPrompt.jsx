import { useState } from "react";

function FixedPrompt({ show, onSubmit }) {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const sumbitText = text;
    onSubmit(sumbitText);
    setText("");
    show(false);
  };

  return (
    <div>
      <section className="fixed-prompt">
        Enter Subtasks
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="replyText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
        </form>
      </section>
    </div>
  );
}

export default FixedPrompt;
