import { ListElement } from "./ListElement";
import "./List.css";

export const List = ({ items, onRemove }) => {
  return (
    <section className="list">
      <h2 className="list-title">🧾expences</h2>
      <div className="list-cards">
        {items.map((item) => (
          <ListElement item={item} onRemove={onRemove} key={item.id} />
        ))}
      </div>
    </section>
  );
};
