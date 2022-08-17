import MovieList from "features/booking/components/MovieList";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Pagination } from "antd";
import { fetchMoviesAction } from "features/booking/action";

function Home() {
  // useDispatch
  const dispatch = useDispatch();
  const [config, setConfig] = useState({
    currentPage: 1,
    pageSize: 8,
    totalCount: 0,
  });

  const changeTotalCount = (total) => {
    setConfig({ ...config, totalCount: total });
  };

  // Call API
  const fetchMovies = async () => {
    dispatch(fetchMoviesAction(config, changeTotalCount));
  };

  // handleChangePage

  const handleChangePage = (page) => {
    setConfig({ ...config, currentPage: page });
  };

  // useEffect API
  useEffect(() => {
    fetchMovies();
  }, [config.currentPage]);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: 40 }}>Danh sách phim</h1>
      <MovieList />
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 30,
          paddingBottom: 30,
        }}
        onChange={handleChangePage}
        current={config.currentPage}
        pageSize={config.pageSize}
        total={config.totalCount}
      />
    </div>
  );
}

export default Home;
