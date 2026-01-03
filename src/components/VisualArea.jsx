function VisualArea({ array, activeIndices }) {
  return (
    <div className="visual-area">
      {array.map((value, index) => (
        <div
          key={index}
          className={`bar ${activeIndices.includes(index) ? "active" : ""}`}
          style={{ height: `${value}px` }}
        />
      ))}
     
    </div>
  );
}

export default VisualArea;
