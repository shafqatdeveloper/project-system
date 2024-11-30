const UserAvatar = ({ src, height, width, className, isOnline, style }) => {
  return (
    <div className="position-relative" style={{ height: height, width: width }}>
      <img
        src={src}
        height={height}
        width={width}
        style={style}
        className="full-rounded object-fit-cover"
      />
      {isOnline ? (
        <div
          className="position-absolute full-rounded"
          style={{
            height: "10px",
            width: "10px",
            background: "#00DD00",
            bottom: 0,
            right: 0,
          }}
        ></div>
      ) : null}
    </div>
  );
};

export default UserAvatar;
