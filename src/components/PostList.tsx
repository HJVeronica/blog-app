import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

const PostList = ({ hasNavigation = true }: PostListProps) => {
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div className="post__navigation--active">전체 글</div>
          <div>나의 글</div>
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
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostList;
