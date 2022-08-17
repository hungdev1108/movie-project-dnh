import instance from "api/instance";

export const SET_MOVIES = "booking/SET_MOVIES";

// async action fetchMoviesAction
export const fetchMoviesAction = (config, cb) => {
  return async (dispatch) => {
    try {
      console.log("call api in thunk");
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
        method: "GET",
        params: {
          maNhom: "GP02",
          soTrang: config.currentPage,
          soPhanTuTrenTrang: config.pageSize,
        },
      });
      cb(res.data.content.totalCount);

      dispatch({ type: SET_MOVIES, payload: res.data.content });
    } catch (err) {
      console.log(err);
    }
  };
};

// async action fetchMoviesAction
export const fetchMovieDetailAction = (config, cb) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayThongTinPhim",
        method: "GET",
        params: {
          MaPhim: "1435",
        },
      });
      cb(res.data.content.totalCount);

      dispatch({ type: SET_MOVIES, payload: res.data.content });
    } catch (err) {
      console.log(err);
    }
  };
};
