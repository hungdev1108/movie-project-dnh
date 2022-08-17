import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

function Detail() {
  const match = useRouteMatch();

  const fetchMovieDetail = () => {
    // 1. lấy url => mã phim
    const movieId = match.params.id;
    // 2. viết async action fetchMovieDetailAction

    // 3. dispatch async action

    // 4. lên store, tạo thêm 1 dữ liệu mới, xử lý action

    // 5. lấy selectedMovie và hiện ra màn hình
  };

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  return <div>Detail</div>;
}

export default Detail;
