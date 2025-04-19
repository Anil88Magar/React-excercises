import React, { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (!state.isActive && action.type !== "openAccount") {
    return state; // Prevent all actions except opening account
  }

  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: 500,
        isActive: true,
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "withdraw":
      return state.balance >= action.payload
        ? {
            ...state,
            balance: state.balance - action.payload,
          }
        : state;

    case "requestLoan":
      return state.loan === 0
        ? {
            ...state,
            balance: state.balance + action.payload,
            loan: action.payload,
          }
        : state;

    case "payLoan":
      return state.balance >= state.loan && state.loan > 0
        ? {
            ...state,
            balance: state.balance - state.loan,
            loan: 0,
          }
        : state;

    case "closeAccount":
      return state.balance === 0 && state.loan === 0 ? initialState : state;

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { balance, loan, isActive } = state;

  return (
    <div className="bank-app">
      <div className="bank-card">
        <h1 className="bank-title">Reducer Bank</h1>
        <div className="bank-details">
          <p className="bank-balance">
            Balance: <span>{balance}</span>
          </p>
          <p className="bank-loan">
            Loan: <span>{loan}</span>
          </p>
        </div>
      </div>

      <div className="bank-actions">
        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive}
        >
          {isActive ? "Account Open" : "Open Account"}
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive || balance < 50}
        >
          Withdraw 50
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: "requestLoan", payload: 500 })}
          disabled={!isActive || loan > 0}
        >
          Request Loan 500
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isActive || loan === 0 || balance < loan}
        >
          Pay Loan
        </button>
        <button
          className="btn btn-danger"
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive || balance !== 0 || loan !== 0}
        >
          Close Account
        </button>
      </div>
    </div>
  );
}
