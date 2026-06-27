import "./topbar.css";

function InputBox() {
  return (
    <div className="topbar-wrapper">
      <select className="status-dropdown">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <form action="" className="input-container">
        <input type="text" placeholder="Type Any Task..." required />
        <button className="add">Add</button>
      </form>
    </div>
  );
}

export default InputBox;
