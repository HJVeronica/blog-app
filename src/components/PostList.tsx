import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { db } from "firebaseApp";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { toast } from "react-toastify";

import AuthContext from "context/AuthContext";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export interface CommentsInterface {
  uid: string;
  content: string;
  createdAt: string;
  email: string;
}

export interface PostProps {
  id?: string;
  title: string;
  content: string;
  createdAt: string;
  email: string;
  summary: string;
  updatedAt?: string;
  uid: string;
  category: CategoryType;
  comments?: CommentsInterface[];
}

type TabType = "all" | "my" | "no-category";
export type CategoryType =
  | "없음"
  | "frontend"
  | "backend"
  | "devops"
  | "design";
export const CATEGORIES: CategoryType[] = [
  "frontend",
  "backend",
  "devops",
  "design",
];

const PostList = ({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    setPosts([]);

    let postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my" && user) {
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
    } else if (activeTab === "all") {
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    } else if (activeTab === "no-category") {
      postsQuery = query(
        postsRef,
        where("category", "==", "없음"),
        orderBy("createdAt", "desc")
      );
    } else {
      // 카테고리 필터
      postsQuery = query(
        postsRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "desc")
      );
    }

    const data = await getDocs(postsQuery);

    data?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));

      toast.success("게시글 삭제 완료!");
      getPosts(); // 삭제 후 포스트 다시 불러오기
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]); // activeTab이 바뀔 때마다 useEffect 실행

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
          <div
            role="presentation"
            onClick={() => setActiveTab("no-category")}
            className={
              activeTab === "no-category" ? "post__navigation--active" : ""
            }
          >
            분류없음
          </div>
          {CATEGORIES.map((category) => (
            <div
              role="presentation"
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? "post__navigation--active" : ""
              }
            >
              {category}
            </div>
          ))}
        </div>
      )}

      <div className="post__list">
        {posts?.length > 0 ? (
          posts.map((post, idx) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile"></div>
                  <div className="post__info-box">
                    <div className="post__author-name">{post?.email}</div>
                    <div className="post__created-at">{post?.createdAt}</div>
                  </div>
                </div>
                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.summary}</div>
              </Link>

              <div className="post__utils-box">
                {post?.email === user?.email ? (
                  <div>
                    <div
                      className="post__delete"
                      role="presentation"
                      onClick={() => handleDelete(post.id as string)}
                    >
                      삭제
                    </div>
                    <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                      수정
                    </Link>
                  </div>
                ) : (
                  <div></div>
                )}
                {post?.category !== "없음" ? (
                  <div className="post__category">{post?.category}</div>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <div className="post__no-post">포스트가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default PostList;
