import React, { useState, useEffect } from "react";
import "./App.css";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseForm } from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [
      { id: uuid(), amount: 2000, charge: "Home payment" },
      { id: uuid(), amount: 1000, charge: "Car payment" },
      { id: uuid(), amount: 500, charge: "Student Loan payment" }
    ];
function App() {
  /******************* state values  *********************/
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState("");
  //single Amount
  const [amount, setAmount] = useState("");
  //alert
  const [alert, setAlert] = useState({ show: false });
  //edit flag
  const [edit, setEdit] = useState(false);
  // editID
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  /******************* functionality  *********************/
  //create function to handle event of expense form
  const handleCharge = e => {
    console.log(`charge: ${e.target.value}`);
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    console.log(`amount: ${e.target.value}`);
    setAmount(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      //edit function
      console.log(edit);
      if (edit) {
        let newExpenses = expenses.map(item => {
          if (item.id === editId) return { ...item, charge, amount };
          else return item;
        });
        console.log(newExpenses);
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item Editted" });
      }
      //add function
      else {
        const newitem = {
          id: uuid(),
          charge: charge,
          amount: amount
        };
        setExpenses([...expenses, newitem]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      //seterror
      handleAlert({
        type: "danger",
        text: "Please fill up the Charge And Amount"
      });
    }
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  //clear all items
  const handleClearItems = () => {
    console.log("cleared all items");
    setExpenses([]);
  };

  //delete on item
  const handleDelete = id => {
    console.log(`i got the id: ${id}`);
    handleAlert({ type: "danger", text: `Item Deleted` });
    setExpenses(
      expenses.filter(item => {
        return item.id !== id;
      })
    );
  };
  //find item with id

  //edit item
  const handleEdit = id => {
    let editItem = expenses.find(item => item.id === id);
    //console.log(editItem);
    setEdit(true);
    setEditId(id);
    setCharge(editItem.charge);
    setAmount(editItem.amount);
  };
  return (
    <>
      {alert.show && (
        <Alert isEditting={edit} type={alert.type} text={alert.text} />
      )}

      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          isEditting={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleClearItems={handleClearItems}
        />
      </main>
      <h1>
        total spending:{" "}
        <span>
          $
          {expenses.reduce((acc, curr) => {
            return acc + parseInt(curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
