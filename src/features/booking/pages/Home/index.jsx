import instance from "api/instance";
import MovieList from "features/booking/components/MovieList";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Pagination } from "antd";

function Home() {
  // useDispatch
  const dispatch = useDispatch();
  const [config, setConfig] = useState({
    currentPage: 1,
    pageSize: 4,
    totalCount: 0,
  });

  // Call API
  const fetchMovies = async () => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
        method: "GET",
        params: {
          maNhom: "GP01",
          soTrang: config.currentPage,
          soPhanTuTrenTrang: config.pageSize,
        },
      });

      setConfig({
        ...config,
        totalCount: res.data.content.totalCount,
      });

      dispatch({ type: "booking/SET_MOVIES", payload: res.data.content });
    } catch (err) {
      console.log(err);
    }
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
    <div className="container" style={{ textAlign: "center", fontSize: 22 }}>
      <h1>Danh sách phim</h1>
      <MovieList / 
      <Pagination
        onChange={handleChangePage}
        current={config.currentPage}
        pageSize={config.pageSize}
        total={config.totalCount}
      />
    </div>
  );
}

export default Home;
