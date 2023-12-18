import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div>
        <Link to="/" className="blog__home">
          블로그 홈
        </Link>
      </div>
      <div className="headre__right">
        <Link to="/posts">피드</Link>
        <Link to="/profile">프로필</Link>
        <Link to="/posts/new" className="header__write">
          <button className="header__write--btn">글쓰기</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
