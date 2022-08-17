import { Col, Row, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import MovieItem from "../MovieItem";

function MovieList() {
  // useSelector
  const movieInfo = useSelector((state) => state.booking.movies);

  if (!movieInfo)
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );

  return (
    <div className="container">
      <Row gutter={20}>
        {movieInfo.items.map((item) => (
          <Col key={item.maPhim} xs={24} sm={12} md={8} lg={6}>
            <MovieItem item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MovieList;
