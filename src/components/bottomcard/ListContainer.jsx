import { useEffect, useRef } from "react";
import ListCard from "./ListCard.jsx";
import "./bottomcard.css";

function ListContainer({
  lists,
  onToggle,
  filter,
  onDelete,
  onAdd,
  dateFilter,
}) {
  const scrollRef = useRef(null);
  const lenRef = useRef(0);

  useEffect(() => {
    lenRef.current = lists.length;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lenRef.current - lists.length < 0) {
      console.log(lenRef.current, " ", lists.length);

      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      lenRef.current++;
    } else if (lenRef.current - lists.length > 0) {
      lenRef.current--;
    }
  }, [lists]);

  const priorityFilter = lists.filter((taskObj) => {
    if (filter === "Pending") return taskObj.isCompleted === false;
    if (filter === "Completed") return taskObj.isCompleted === true;
    return true;
  });

  const filteredTasks = priorityFilter.filter((taskObj) => {
    if (!taskObj.date) return true;

    const [day, month, year] = taskObj.date.split("/");

    const taskDate = new Date(year, month - 1, day);
    const today = new Date();

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    if (dateFilter === "Today") {
      return taskDate >= startOfToday;
    }

    if (dateFilter === "Last Two Days") {
      const twoDaysAgo = new Date(startOfToday);
      twoDaysAgo.setDate(startOfToday.getDate() - 1);
      return taskDate >= twoDaysAgo;
    }

    if (dateFilter === "This Week") {
      const sevenDaysAgo = new Date(startOfToday);
      sevenDaysAgo.setDate(startOfToday.getDate() - 6);
      return taskDate >= sevenDaysAgo;
    }

    if (dateFilter === "This Month") {
      return (
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
      );
    }

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
          onAdd={onAdd}
          isReply={false}
        />
      ))}
      <div className="scroll" ref={scrollRef} />
    </div>
  );
}

export default ListContainer;
