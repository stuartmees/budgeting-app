import Banner from '@/components/Banner';

interface LoadingPageProps {
  showLogout?: boolean;
  onLogout?: () => void;
}

const LoadingPage = ({ showLogout = false, onLogout }: LoadingPageProps) => (
  <div className="min-h-screen flex flex-col">
    <Banner showLogout={showLogout} onLogout={onLogout} />
    <div className="flex-1 flex items-center justify-center">
      <h2 className="text-3xl font-bold" style={{ fontFamily: "'Libre Baskerville', serif" }}>Loading...</h2>
    </div>
  </div>
);

export default LoadingPage;
