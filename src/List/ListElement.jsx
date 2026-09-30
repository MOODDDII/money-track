export const ListElement = ({ item, onRemove }) => {
  return (
    <div className="card">
      <p>📝 : {item.note}</p>
      <p>💸 : {item.amount}</p>
      <p>📅 : {item.date}</p>
      <input type="button" value="delete🗑️" onClick={() => onRemove(item.id)} />
    </div>
  );
};
