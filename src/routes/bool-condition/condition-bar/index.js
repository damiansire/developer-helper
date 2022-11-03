import { h } from "preact";
import style from "./style.css";

// Note: `user` comes from the URL, courtesy of our router
const ConditionBar = ({ setConditionValue }) => {
  return (
    <div class={style.profile}>
      <div>
        <input onInput={(event) => setConditionValue(event.target.value)} />
      </div>
    </div>
  );
};

export default ConditionBar;
