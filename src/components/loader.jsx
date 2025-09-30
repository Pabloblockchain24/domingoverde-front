export default function Loader({ size = 50, color = "#2e7d32" }) {
  return (
    <div className="loader-wrapper">
      <div
        className="loader"
        style={{
          width: size,
          height: size,
          borderTop: `6px solid ${color}`,
        }}
      ></div>
    </div>
  );
}