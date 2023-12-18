import { useState } from "react";
import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = "all" | "my";

const PostList = ({ hasNavigation = true }: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체 글
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
        </div>
      )}

      <div className="post__list">
        {[...Array(10)].map((e, idx) => (
          <div key={idx} className="post__box">
            <Link to={`/posts/${idx + 1}`}>
              <div className="post__profile-box">
                <div className="post__profile"></div>
                <div className="post__info-box">
                  <div className="post__author-name">글쓴이</div>
                  <div className="post__created-at">2023.12.18</div>
                </div>
              </div>
              <div className="post__title">게시글 {idx + 1}</div>
              <div className="post__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                nec porttitor nunc, at eleifend risus. Integer nec mattis
                turpis, eget posuere nunc. Suspendisse feugiat turpis tempor,
                aliquet erat ut, scelerisque felis. Donec sapien urna, vulputate
                ut nibh feugiat, tempor tincidunt metus. Sed vel ex ultrices
                libero cursus consectetur. Proin facilisis malesuada mauris sit
                amet scelerisque. Morbi ac diam tortor. Nunc cursus arcu ligula,
                et laoreet risus mollis nec. Duis sit amet urna augue. Nullam
                iaculis congue ultricies. Pellentesque tincidunt mauris et lorem
                iaculis, et rhoncus risus lacinia. Maecenas bibendum eleifend
                nulla sed blandit.
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">
                  <Link to={`/posts/edit/1`}>수정</Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostList;
