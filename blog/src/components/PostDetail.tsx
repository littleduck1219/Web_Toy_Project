import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const PostDetail = () => {
  return (
    <>
      <Header />
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus fugiat modi fugit rem mollitia impedit hic magnam nobis
            beatae error.
          </div>
          <div className="post__profile-box">
            <div className="post__profile" />
            <div className="post__author-name">패스트 캠퍼스</div>
            <div className="post__date">2023.07.08 토요일</div>
          </div>
          <div className="post__utils-box">
            <div className="post__delete">삭제</div>
            <div className="post__edit">
              <Link to={`/posts/edit/1`}>수정</Link>
            </div>
          </div>
          <div className="post__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            corrupti nemo beatae necessitatibus dolores maxime consectetur
            incidunt! Recusandae, id voluptatem excepturi, quos est repellendus
            aliquam rem quaerat dignissimos unde voluptatum?
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostDetail;
