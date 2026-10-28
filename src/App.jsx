
import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  let income = 0, expense = 0;

  list.forEach((item) => {
    if (item.type === "income") income += item.amount;
    else expense += item.amount;
  });

  function add(e) {
    e.preventDefault();
    if (!name.trim() || Number(amount) <= 0) return;

    setList([...list, {
      id: Date.now(),
      name,
      amount: Number(amount),
      type
    }]);

    setName("");
    setAmount("");
  }

  return (
    <>
      <main className="app">
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">₹</div>
            <div><h2>SpendWise</h2><p>Student Expense Tracker</p></div>
          </div>
        </header>

        <section className="welcome">
          <div><h1>My Dashboard</h1><p className="subtitle">Manage your money easily.</p></div>
        </section>

        <section className="summary-grid">
          <article className="summary-card balance-card">
            <p>Balance</p><h2>₹{income - expense}</h2>
          </article>
          <article className="summary-card">
            <p>Income</p><h2 className="income-text">₹{income}</h2>
          </article>
          <article className="summary-card">
            <p>Expenses</p><h2 className="expense-text">₹{expense}</h2>
          </article>
        </section>

        <section className="content-grid">
          <article className="panel">
            <h2>Add Transaction</h2>
            <form onSubmit={add}>
              <label>Description</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter description" />

              <label>Amount (₹)</label>
              <input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" />

              <label>Type</label>
              <select value={type} onChange={e => setType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <button className="submit-button">Add Transaction</button>
            </form>
          </article>

          <article className="panel">
            <h2>Transaction History</h2>
            {list.length === 0 && <p className="empty-state">No transactions yet.</p>}

            {list.map(item => (
              <div className="transaction" key={item.id}>
                <div className="transaction-info">
                  <strong>{item.name}</strong>
                  <span>{item.type}</span>
                </div>
                <div className="transaction-right">
                  <strong>₹{item.amount}</strong>
                  <button className="delete-button" onClick={() =>
                    setList(list.filter(t => t.id !== item.id))
                  }>Delete</button>
                </div>
              </div>
            ))}
          </article>
        </section>

        <footer className="footer">SpendWise - Student Expense Tracker</footer>
      </main>
    </>
  );
}

export default App;
