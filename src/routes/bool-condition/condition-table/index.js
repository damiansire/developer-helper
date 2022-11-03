import { h } from "preact";
import style from "./style.css";
import { useEffect, useState } from "preact/hooks";

const getVariables = (condition) => {
  condition = condition.replace(/\s+/g, " ").trim();
  condition = condition.replaceAll("!", " ");
  condition = condition.replaceAll("||", " ");
  condition = condition.replaceAll("&&", " ");
  condition = condition.replace(/\s+/g, " ").trim();
  return condition.split(" ");
};

const getStates = (variables) => {
  if (variables.length === 0) {
    return [];
  }
  if (variables.length === 1) {
    return [[true], [false]];
  }
  const firstElement = variables[0];
  const remainderStates = getStates(variables.slice(1));
  const concatResult = [];
  remainderStates.forEach((state) => {
    concatResult.push([true].concat(state));
    concatResult.push([false].concat(state));
  });
  return concatResult;
};

// a && b && c  => true && true && false
const replaceValueInCondition = (variables, state, condition) => {
  variables.forEach((variable, index) => {
    condition = condition.replaceAll(variable, state[index]);
  });
  return condition;
};

const evaluateConditions = (variables, states, condition) => {
  const result = states.map((state) => {
    return evaluateCondition(variables, state, condition);
  });
  return result;
};

const evaluateNot = (conditionValue) => {
  let prev = conditionValue;
  while (conditionValue.includes("!true") || conditionValue.includes("!false")) {
    conditionValue = conditionValue
      .replaceAll("!true", "false")
      .replaceAll("!false", "true");
  }
  return conditionValue;
};

const evaluateAnd = (conditionValue) => {
  while (conditionValue.includes("&&")) {
    conditionValue = conditionValue
      .replaceAll("true && true", "true")
      .replaceAll("true && false", "false")
      .replaceAll("false && true", "false")
      .replaceAll("false && false", "false");
  }
  return conditionValue;
};

const evaluateFirstPrecedence = (conditionValue) => {
  conditionValue = evaluateNot(conditionValue);
  conditionValue = evaluateAnd(conditionValue);
  return conditionValue;
};

const evaluateCondition = (variables, state, condition) => {
  let conditionValue = replaceValueInCondition(variables, state, condition);
  conditionValue = evaluateFirstPrecedence(conditionValue);
  return conditionValue;
};

// Note: `user` comes from the URL, courtesy of our router
const ConditionTable = ({ conditionValue }) => {
  const [variables, setVariables] = useState([]);
  const [states, setStates] = useState([]);
  const [evaluatedCondition, setEvaluatedCondition] = useState([]);

  useEffect(() => {
    const variables = getVariables(conditionValue);
    setVariables(() => variables);
    setStates(() => {
      const newStates = getStates(variables);
      return newStates;
    });
  }, [conditionValue]);

  useEffect(() => {
    setEvaluatedCondition(() => {
      return evaluateConditions(variables, states, conditionValue);
    });
  }, [states]);
  return (
    <div class={style.profile}>
      La condicion es: {conditionValue}
      <table>
        <thead>
          <tr>
            {variables.map((variable) => {
              return <th>{variable}</th>;
            })}
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {states?.map((row, index) => {
            return (
              <tr>
                {row.map((state) => {
                  return <td>{state ? "true" : "false"}</td>;
                })}
                {evaluatedCondition && <td> {evaluatedCondition[index]}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ConditionTable;
