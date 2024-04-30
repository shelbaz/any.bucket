export const Loader = ({ size }: { size: number }) => (
  <div
    className="animate-spin"
    style={{
      width: size,
      height: size,
      boxSizing: "border-box",
      border: `${size / 5}px solid`,
      borderRadius: "100%",
      borderColor: "#e0e0e0",
      borderRightColor: "#616161",
    }}
  />
);
