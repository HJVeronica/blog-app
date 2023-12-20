import { useContext } from "react";
import ThemeContext from "context/ThemeContext";

import { Link } from "react-router-dom";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const Header = () => {
  const context = useContext(ThemeContext);

  return (
    <header className="header">
      <div>
        <Link to="/" className="blog__home">
          블로그 홈
        </Link>
      </div>
      <div className="header__right">
        <Link to="/posts">피드</Link>
        <Link to="/profile">프로필</Link>
        <Link to="/posts/new" className="header__write">
          <button className="header__write--btn">글쓰기</button>
        </Link>
        <div>
          {context.theme === "light" ? (
            <BsSunFill
              onClick={context.toggleMode}
              className="header__theme-btn"
            />
          ) : (
            <BsMoonFill
              onClick={context.toggleMode}
              className="header__theme-btn"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
