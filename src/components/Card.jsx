import React from "react";

const Card = ({ title, amount, ...props }) => {
  return (
    <main className="card">
      <p>{title} </p>
      <h2 {...props}>{amount}</h2>
    </main>
  );
};

export default Card;
