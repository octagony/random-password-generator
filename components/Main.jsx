import React, { useState, useEffect } from "react";
const generator = require("generate-password");

const Main = () => {
  /*  const password = generator.generate({
    length:10,
    numbers:true,
  }) */

  const [password, setPassword] = useState(null);

  useEffect(() => {
    setPassword(
      generator.generate({
        length: 50,
        numbers: true,
        symbols: true,
      })
    );
  }, []);

  const handleGenerate = () =>{
    setPassword(
      generator.generate({
        length: 50,
        numbers: true,
        symbols: true,
      })
    );
  }

  return (
    <div className="text-center">
      <h2>Let&apos;s create a password for you!</h2>
    </div>
  );
};

export default Main;
