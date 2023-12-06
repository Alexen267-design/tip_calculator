import { useState } from "react";

const percentages = [
  { percentage: "5%", id: "1A" },
  { percentage: "10%", id: "2B" },
  { percentage: "15%", id: "3C" },
  { percentage: "20%", id: "4D" },
  { percentage: "50%", id: "5F" },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <TipCalculator />
    </div>
  );
}

function Logo() {
  return <img className="logo" src="images/logo.svg" alt="Spliter logo" />;
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [numPerson, setNumPerson] = useState("");
  const [selected, setSelected] = useState(null);
  const [custom, setCustom] = useState("");
  const tip = Number(bill) * (parseInt(selected) / 100);
  const tipPerPerson = tip / Number(numPerson);
  const totalPerPerson = (Number(bill) + tip) / Number(numPerson);
  const disabled = bill || numPerson || selected || custom;

  function handleReset(e) {
    setBill("");
    setNumPerson("");
    setSelected(null);
    setCustom("");
  }

  console.log(`Tip per person: ${tipPerPerson}`);
  console.log(`Total per person: ${totalPerPerson}`);
  console.log(`Percentage: ${parseInt(selected)}`);
  return (
    <div className="tip-calculator" onChange={() => console.log(tipPerPerson)}>
      <BillInput
        bill={bill}
        setBill={setBill}
        numPerson={numPerson}
        setNumPerson={setNumPerson}
        selected={selected}
        setSelected={setSelected}
        custom={custom}
        setCustom={setCustom}
      />
      <BillOutput
        tipPerPerson={tipPerPerson}
        totalPerPerson={totalPerPerson}
        disabled={disabled}
        onReset={handleReset}
      />
    </div>
  );
}

function BillInput({
  bill,
  setBill,
  numPerson,
  setNumPerson,
  selected,
  setSelected,
  custom,
  setCustom,
}) {
  return (
    <div className="bill-input">
      <div className="input">
        <label>Bill</label>
        <span className="icon">
          <img src="images/icon-dollar.svg" alt="dollar sign" />
        </span>
        <input
          type="text"
          placeholder="0"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
      </div>
      <div className="input">
        <label>Select tip</label>
        <TipPercentage
          selected={selected}
          onSelected={setSelected}
          custom={custom}
          setCustom={setCustom}
        />
      </div>
      <div className="input">
        <label>
          Number of people{" "}
          {parseInt(numPerson) === 0 ? (
            <span style={{ color: "#ff1e00" }}>Can't be zero </span>
          ) : (
            false
          )}
        </label>
        <span className="icon">
          <img src="images/icon-person.svg" alt="person icon" />
        </span>
        <input
          type="text"
          placeholder="0"
          value={numPerson}
          className={parseInt(numPerson) === 0 ? "error" : ""}
          onChange={(e) => {
            console.log(e.target.value);
            setNumPerson(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

function TipPercentage({ selected, onSelected, custom, setCustom }) {
  function handleCustom(e) {
    onSelected(e.target.value);
    setCustom(e.target.value);
  }
  return (
    <div className="percentages">
      {percentages.map((btn) => (
        <Button
          selected={selected}
          onSelected={onSelected}
          key={btn.id}
          percentage={btn.percentage}
        >
          {btn.percentage}
        </Button>
      ))}
      <input
        type="text"
        placeholder="custom"
        className="custom"
        value={custom}
        onChange={(e) => {
          handleCustom(e);
        }}
      />
    </div>
  );
}

function Button({ children, selected, onSelected, percentage }) {
  return (
    <button
      className={"btn" + (selected === percentage ? " selected" : "")}
      onClick={(e) => {
        onSelected(e.target.textContent);
      }}
    >
      {children}
    </button>
  );
}

function BillOutput({ tipPerPerson, totalPerPerson, disabled, onReset }) {
  return (
    <div className="bill-output">
      <div>
        <TipOutput tipPerPerson={tipPerPerson}>Tip Amount</TipOutput>
        <TotalOutput totalPerPerson={totalPerPerson}>Total</TotalOutput>
      </div>
      <button
        className={"reset" + (!disabled ? " disabled" : "")}
        onClick={() => onReset()}
      >
        reset
      </button>
    </div>
  );
}

function TipOutput({ children, tipPerPerson }) {
  return (
    <div className="output">
      <div className="tip">
        {children} <span>/ person</span>
      </div>
      <h1 className="tip-output">
        {isNaN(tipPerPerson) || tipPerPerson === Infinity
          ? "$0.00"
          : `$${tipPerPerson.toFixed(2)}`}
      </h1>
    </div>
  );
}

function TotalOutput({ children, totalPerPerson }) {
  return (
    <div className="output">
      <div className="tip">
        {children} <span>/ person</span>
      </div>
      <h1 className="tip-output">
        {isNaN(totalPerPerson) || totalPerPerson === Infinity
          ? "$0.00"
          : `$${totalPerPerson.toFixed(2)}`}
      </h1>
    </div>
  );
}
