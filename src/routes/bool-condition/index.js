import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import style from "./style.css";
import ConditionBar from "./condition-bar";
import ConditionTable from "./condition-table";

// Note: `user` comes from the URL, courtesy of our router
const BoolCondition = () => {
  const [conditionValue, setConditionValue] = useState("");

  const setInitialConditionValue = (text) => {
    setConditionValue(() => {
      const cleanCondition = text.replace(/\s+/g, " ").trim();
      return cleanCondition;
    });
  };

  setConditionValue(() => {
    return "!persona && comida && hambre";
  });
  return (
    <div class={style.profile}>
      <h1>Bool Condition:</h1>
      <ConditionBar setConditionValue={setInitialConditionValue}></ConditionBar>
      {conditionValue && (
        <ConditionTable conditionValue={conditionValue}></ConditionTable>
      )}
    </div>
  );
};

export default BoolCondition;
