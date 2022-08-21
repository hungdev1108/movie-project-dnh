import { Button, Card, Spin } from "antd";
import { formatDate } from "common/utils/date";
import { fetchCinemasAction, fetchMovieDetailAction, fetchMovieScheduleAction } from "features/booking/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import styles from "./style.module.css";

function Detail() {
  // useDispatch
  const dispatch = useDispatch();
  // UseRouteMatch
  const match = useRouteMatch();

  const movieId = match.params.id;

  const movieDetail = useSelector((state) => state.booking.selectedMovie);
  const cinemas = useSelector((state) => state.booking.cinemas);
  const schedule = useSelector((state) => state.booking.schedule);

  // fetchMovieDetail
  const fetchMovieDetail = () => {
    dispatch(fetchMovieDetailAction(movieId));
  };

  // fetchCinemas
  const fetchCinemas = async () => {
    const dataCinemas = await dispatch(fetchCinemasAction);
    fetchMovieSchedule(dataCinemas[0].maHeThongRap);
  };

  // fetchMovieSchedule
  const fetchMovieSchedule = (id) => {
    dispatch(fetchMovieScheduleAction(id));
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchCinemas();
  }, []);

  if (!movieDetail) {
    return <Spin />;
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", fontSize: 40 }}>Nội dung phim</h2>
      <div className={styles.movie_selected}>
        <div className="movie_selected_img">
          <img style={{ width: 400 }} src={movieDetail.hinhAnh} alt="" />
        </div>
        <div className={styles.movie_selected_info}>
          <h3>Tên phim: {movieDetail.tenPhim}</h3>
          <h3>Ngày khởi chiếu: {new Date(movieDetail.ngayKhoiChieu).toLocaleDateString()}</h3>
          <p style={{ maxWidth: 500 }}>
            <b>Mô tả:</b> {movieDetail.moTa}
          </p>

          <div style={{ margin: 15 }}>
            {cinemas?.map((item) => {
              return (
                <img
                  key={item.maHeThongRap}
                  style={{
                    width: 50,
                    marginRight: 20,
                  }}
                  src={item.logo}
                  alt=""
                />
              );
            })}
          </div>

          {schedule?.lstCumRap.map((item) => {
            const currentMovie = item.danhSachPhim.find((movie) => movie.maPhim.toString() === movieId);
            if (!currentMovie) return null;

            return (
              <Card style={{ margin: 15, backgroundColor: "#000", color: "#fff" }}>
                <img style={{ width: 100 }} src={item.hinhAnh} alt="" />
                <p style={{ marginTop: 10 }}>{item.tenCumRap}</p>

                {/* Lich cac suat chieu cua phim theo rap */}
                {currentMovie.lstLichChieuTheoPhim.map((show) => {
                  return (
                    <Button style={{ marginRight: 10, marginBottom: 10 }} type="default">
                      {formatDate(show.ngayChieuGioChieu)}
                    </Button>
                  );
                })}
              </Card>
            );
          })}

          <div className="video-responsive">
            <h3>Trailer phim</h3>
            {movieDetail.trailer.startsWith("https") && (
              <iframe
                width="500"
                height="300"
                src={movieDetail?.trailer}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={movieDetail.tenPhim}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
