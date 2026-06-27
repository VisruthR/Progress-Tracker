import ListCard from "./ListCard.jsx";
import "./bottomcard.css";

function ListContainer({ lists, onToggle }) {
  return (
    <div className="container">
      {lists.map((taskObj) => (
        <ListCard key={taskObj.id} list={taskObj} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default ListContainer;
