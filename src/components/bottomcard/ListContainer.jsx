import { useEffect, useRef } from "react";
import ListCard from "./ListCard.jsx";
import "./bottomcard.css";

function ListContainer({ lists, onToggle, filter, onDelete }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [lists]);

  const filteredTasks = lists.filter((taskObj) => {
    if (filter === "Pending") return taskObj.isCompleted === false;
    if (filter === "Completed") return taskObj.isCompleted === true;
    return true;
  });

  return (
    <div className="container">
      {filteredTasks.map((taskObj) => (
        <ListCard
          key={taskObj.id}
          list={taskObj}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
      <div className="scroll" ref={scrollRef} />
    </div>
  );
}

export default ListContainer;
