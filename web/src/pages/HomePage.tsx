import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/Button';
import type { RootState } from '@/store';

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const [showMessage, setShowMessage] = useState(false);

  const handleSetupBudget = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3500);
  };

  return (
    !!user &&
      <>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-8 font-heading">
          Hi, {user?.displayName || 'User'}!
        </h2>

        <Button onClick={handleSetupBudget} className="hover:bg-primary/80 text-sm md:text-base font-normal tracking-normal">
          Set up your first monthly budget...
        </Button>

        {showMessage && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-6 py-4 bg-primary/15 rounded-md">
            <p className="text-primary text-center">Hang on, mate. We've not got that far yet!</p>
          </div>
        )}
      </div>
      </> 
  );
};

export default HomePage;
