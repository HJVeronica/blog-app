import { Link } from "react-router-dom";

const PostDetail = () => {
  return (
    <>
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">
            Morbi faucibus odio ac urna condimentum iaculis.
          </div>

          <div className="post__profile-box">
            <div className="post__profile"></div>
            <div>
              <div className="post__author-name">작성자</div>
              <div className="post__created-at">2023.12.18</div>
            </div>
          </div>

          <div className="post__utils-box">
            <div className="post__delete">삭제</div>
            <div className="post__edit">
              <Link to={`/posts/edit/1`}>수정</Link>
            </div>
          </div>

          <div className="post__content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            molestie ipsum vitae aliquet consectetur. Praesent consequat at
            risus ac dignissim. Proin sed aliquam tellus, vestibulum consectetur
            urna. Donec posuere ullamcorper elit. Nullam est nibh, tempus vel
            felis in, gravida sagittis lacus. Proin a velit odio. Mauris
            tincidunt ipsum nec felis rutrum pretium. In blandit ante vel libero
            maximus convallis. Ut nec rhoncus lectus. Sed vehicula ut neque non
            eleifend. Donec eros erat, elementum eu pellentesque id, suscipit et
            neque. Duis a dictum diam. Pellentesque nunc tortor, fringilla ac
            ante non, pulvinar tempus velit. Quisque finibus id justo eu
            imperdiet. Integer eu nibh non metus placerat elementum sit amet
            eget erat.
            <br />
            <br />
            Aenean quam odio, consequat eget nisi id, vestibulum gravida orci.
            Nam sodales luctus libero. Nulla mi nunc, vulputate sed pellentesque
            et, aliquam porttitor odio. Sed suscipit orci leo, vitae dictum
            lorem cursus nec. Aenean pellentesque lectus commodo lectus congue,
            at tempus velit fermentum. Proin vitae lobortis diam. Quisque vitae
            ex eros. Aenean pharetra a quam sed venenatis. Duis dapibus, urna
            quis gravida condimentum, quam arcu venenatis justo, eget malesuada
            justo ante sit amet ipsum. Donec ut condimentum tortor. Nullam
            accumsan felis eget quam luctus, ut tempor dui vulputate. Donec
            iaculis et tellus nec pellentesque. Maecenas at luctus dolor. Cras
            pellentesque nec lorem vel pharetra.
            <br />
            <br />
            Sed quis nisi augue. In ornare rhoncus condimentum. Aenean dignissim
            euismod nisl, ullamcorper eleifend elit pellentesque non. Sed felis
            massa, consequat at fringilla sed, placerat a nisi. Donec quis
            lacinia eros. Nulla augue risus, euismod nec eros et, condimentum
            sodales magna. Quisque et blandit velit. Maecenas finibus laoreet
            elit vel convallis. Nam ultrices elit ac ligula accumsan, vel
            consequat sapien gravida. In ultrices odio eu augue sagittis, non
            porta felis malesuada. Aliquam ut sapien magna. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Vestibulum vitae sapien ac
            dolor venenatis cursus a in massa.
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
