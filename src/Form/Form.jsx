import { useState } from "react";
import "./Form.css";

export const Form = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [err, setErr] = useState({});

  const validate = () => {
    const next = {};

    if (amount === "" || Number(amount) <= 0) {
      next.amount = "amount should be graiter than 0";
    }

    if (!note.trim()) {
      next.note = "note should not empty";
    }

    if (!date.trim()) {
      next.date = "date should not be empty";
    } else if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date.trim())) {
      next.date = "use format dd.mm.yyyy";
    } else {
      const [dd, mm, yyyy] = date.trim().split(".").map(Number);
      const parsed = new Date(yyyy, mm - 1, dd);
      const isReal =
        parsed.getFullYear() === yyyy &&
        parsed.getMonth() === mm - 1 &&
        parsed.getDate() === dd;

      if (!isReal) {
        next.date = "invalid date";
      }
    }

    setErr(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const expense = {
      id: crypto.randomUUID(),
      amount: Number(amount),
      category,
      note,
      date,
    };

    onAdd(expense);

    setAmount("");
    setNote("");
    setCategory("food");
    setDate("");
    setErr({});
  };

  return (
    <div className="form">
      <div className="wrapper">
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <h2 className="form-title">🧮 add expance</h2>
            <div className="field">
              <input
                type="number"
                value={amount}
                min={1}
                placeholder="amount"
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="form-err">{err.amount || " "}</p>
            </div>

            <div className="field">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="food">food</option>
                <option value="transport">transport</option>
                <option value="home">home</option>
                <option value="other">other</option>
              </select>
            </div>
            <p className="form-err"></p>

            <div className="field">
              <input
                type="text"
                value={note}
                placeholder="note"
                onChange={(e) => setNote(e.target.value)}
              />
              <p className="form-err">{err.note || " "}</p>
            </div>

            <div className="field">
              <input
                type="text"
                value={date}
                placeholder="dd.mm.yyyy"
                onChange={(e) => setDate(e.target.value)}
              />
              <p className="form-err">{err.date || " "}</p>
            </div>
            <button className="form-submit" type="submit">add ➕</button>
          </form>
        </div>
      </div>
    </div>
  );
};
