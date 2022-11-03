import { h } from "preact";
import { Link } from "preact-router/match";
import style from "./style.css";

const Header = () => (
  <header class={style.header}>
    <h1>Developer Helper</h1>
    <nav>
      <Link activeClassName={style.active} href="/">
        Bool Condition
      </Link>
    </nav>
  </header>
);

export default Header;
