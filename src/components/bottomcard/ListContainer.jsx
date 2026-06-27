import { useEffect, useRef } from "react";
import ListCard from "./ListCard.jsx";
import "./bottomcard.css";

function ListContainer({ lists, onToggle }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [lists]);
  return (
    <div className="container">
      {lists.map((taskObj) => (
        <ListCard key={taskObj.id} list={taskObj} onToggle={onToggle} />
      ))}
      <div className="scroll" ref={scrollRef} />
    </div>
  );
}

export default ListContainer;
