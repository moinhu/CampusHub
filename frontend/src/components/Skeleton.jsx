export default function Skeleton({ height = "20px" }) {
  return (
    <div
      className="animate-pulse bg-gray-300 rounded"
      style={{ height }}
    ></div>
  );
}
