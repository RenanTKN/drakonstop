import "./style.scss";

interface LoadingProps {
  center?: boolean;
}

export default function Loading({ center = false }: LoadingProps) {
  return (
    <div className={center ? "center" : ""}>
      <div className="loading-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
