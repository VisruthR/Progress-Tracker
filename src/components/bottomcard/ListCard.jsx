import "./bottomcard.css";

function ListCard({ list, onToggle }) {
  return (
    <div className="list-card">
      <input
        type="checkbox"
        className="round-checkbox"
        checked={list.isCompleted}
        onChange={() => onToggle(list.id)}
      />

      <div className="card-content">
        <h3
          className={`card-title ${list.isCompleted ? "completed-text" : ""}`}
        >
          {list.title}
        </h3>

        <span className="card-priority">{list.priority} Priority</span>
      </div>
    </div>
  );
}

export default ListCard;
