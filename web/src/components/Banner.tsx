interface BannerProps {
  showLogout?: boolean;
  onLogout?: () => void;
}

const Banner = ({ showLogout = false, onLogout }: BannerProps) => (
  <div className="w-full bg-primary py-4 px-8 flex items-center relative">
    {showLogout && (
      <button onClick={onLogout} className="text-white text-sm md:text-base font-normal tracking-normal absolute left-8 hover:text-white/80">
        Log out
      </button>
    )}
    <h1 className="text-4xl font-bold text-white text-center md:text-right w-full tracking-wider" style={{ fontFamily: "'Libre Baskerville', serif" }}>
      Budgeteer
    </h1>
  </div>
);

export default Banner;
