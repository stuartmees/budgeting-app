const LoadingIndicator = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="flex-1 flex min-h-screen items-center justify-center">
    <h2 className="text-3xl font-bold font-heading">{text}</h2>
  </div>
);

export default LoadingIndicator;