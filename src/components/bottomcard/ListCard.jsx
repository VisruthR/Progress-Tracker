import { useState } from "react";
import "./bottomcard.css";

function ListCard({ list, onToggle, onDelete, onAdd, isReply }) {
  const [showReply, setShowReply] = useState(false);

  const totalReplies = list.replies ? list.replies.length : 0;
  const completedReplies = list.replies
    ? list.replies.filter((reply) => reply.isCompleted).length
    : 0;
  const progressPercent =
    totalReplies > 0 ? Math.round((completedReplies / totalReplies) * 100) : 0;

  const handleCardClick = () => {
    if (!isReply) {
      console.log("card has been clicked", list.title, list.date);
      const state = !showReply;
      setShowReply(state);
    }
  };

  return (
    <div className={`card-wrapper ${isReply ? "nested-reply" : ""}`}>
      <div className="list-card" onClick={handleCardClick}>
        <input
          type="checkbox"
          className="round-checkbox"
          checked={list.isCompleted}
          onClick={(e) => e.stopPropagation()}
          onChange={() => onToggle(list.id)}
        />

        <div className="card-content">
          <h3
            className={`card-title ${list.isCompleted ? "completed-text" : ""}`}
          >
            {list.title}
          </h3>

          <span className="card-priority">{list.priority} Priority</span>

          {/* 2. Show Progress Bar if this task has nested subtasks */}
          {!isReply && totalReplies > 0 && (
            <div className="nested-progress-container">
              <div className="nested-progress-bar">
                <div
                  className="nested-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="nested-progress-text">
                {completedReplies}/{totalReplies} ({progressPercent}%)
              </span>
            </div>
          )}
        </div>

        {!isReply && (
          <button
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(list.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        )}

        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(list.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>

      {/* 3. Render nested subtasks underneath the parent card */}
      {!isReply && totalReplies > 0 && showReply && (
        <div className="replies-container">
          {list.replies.map((replyObj) => (
            <ListCard
              key={replyObj.id}
              list={replyObj}
              onToggle={onToggle}
              onDelete={onDelete}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListCard;
