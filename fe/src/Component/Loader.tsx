type LoaderProps = {
  loading: boolean;
};

export const Loader = ({ loading }: LoaderProps) => {
  if (!loading) return null;

  return (
    <div className="spinner-overlay">
      <span className="loader"></span>
    </div>
  );
};
