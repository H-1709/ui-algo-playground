function VisualArea({ array, activeIndices }) {
  return (
    <div className="visual-area">
      {array.map((value, index) => {
        const isActive = activeIndices.includes(index);

        return (
          <div
            key={index}
            className={`bar ${isActive ? "active" : ""}`}
            style={{ height: `${value}px` }}
          />
        );
      })}
    </div>
  );
}

export default VisualArea;
