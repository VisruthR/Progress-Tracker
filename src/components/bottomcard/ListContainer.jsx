import { useEffect, useRef } from "react";
import ListCard from "./ListCard.jsx";
import "./bottomcard.css";

function ListContainer({ lists, onToggle, filter }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [lists]);
  return (
    <div className="container">
      {lists.map((taskObj) => {
        if (
          (taskObj.isCompleted === false && filter === "Pending") ||
          (taskObj.isCompleted === true && filter === "Completed") ||
          filter === "All"
        ) {
          return (
            <ListCard key={taskObj.id} list={taskObj} onToggle={onToggle} />
          );
        }
        console.log(taskObj);
      })}
      <div className="scroll" ref={scrollRef} />
    </div>
  );
}

export default ListContainer;
