import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";
export const ExpenseList = ({
  expenses,
  handleEdit,
  handleDelete,
  handleClearItems
}) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return (
            <ExpenseItem
              handleEdit={handleEdit}
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={handleClearItems}>
          Clear expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};
