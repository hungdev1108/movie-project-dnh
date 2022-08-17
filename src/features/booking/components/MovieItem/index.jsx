import { Card } from "antd";
import React from "react";

const { Meta } = Card;

function MovieItem(props) {
  const { tenPhim, hinhAnh, moTa } = props.item;

  return (
    <Card
      hoverable
      cover={
        <img
          alt={tenPhim}
          src={hinhAnh}
          style={{
            height: 300,
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      }
    >
      <Meta title={tenPhim} description={moTa.substr(0, 100) + "..."} />
    </Card>
  );
}

export default MovieItem;
