import instance from "api/instance";

export const SET_MOVIES = "booking/SET_MOVIES";
export const SET_MOVIES_DETAIL = "booking/SET_MOVIES_DETAIL";
export const SET_CINEMAS = "booking/SET_CINEMAS";
export const SET_MOVIE_SCHEDULE = "booking/SET_MOVIE_SCHEDULE";

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
      console.log(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};

// async action fetchMovieDetailAction
export const fetchMovieDetailAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayThongTinPhim",
        method: "GET",
        params: {
          MaPhim: movieId,
        },
      });

      dispatch({ type: SET_MOVIES_DETAIL, payload: res.data.content });
      //   console.log(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};

// async action fetchCinemasAction
export const fetchCinemasAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    });

    dispatch({ type: SET_CINEMAS, payload: res.data.content });
    return res.data.content;
  } catch (err) {
    console.log(err);
  }
};

// async action fetchMovieScheduleAction
export const fetchMovieScheduleAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
        method: "GET",
        params: {
          maHeThongRap: id,
          maNhom: "GP02",
        },
      });

      dispatch({ type: SET_MOVIE_SCHEDULE, payload: res.data.content });
    } catch (err) {
      console.log(err);
    }
  };
};
