import { useState } from "react";
import { Header } from "./Header";
import { Form } from "./Form";
import { List } from "./List/List";

export const App = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const removeExpence = (id) => {
    setExpenses((prev) => prev.filter((elem) => elem.id !== id));
  };

  return (
    <>
      <Header />

      <main>
        <List items={expenses} onRemove={removeExpence} />
        <Form onAdd={addExpense} />
      </main>
    </>
  );
};
