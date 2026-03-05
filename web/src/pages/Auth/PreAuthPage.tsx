import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PreAuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Budgeteer</h1>
      <p className="text-muted-foreground mb-8">Track your monthly budgets in real time.</p>
      <div className="flex gap-4">
        <Link to="/register">
          <Button>Register</Button>
        </Link>
        <Link to="/sign-in">
          <Button variant="outline">Sign In</Button>
        </Link>
      </div>
    </div>
  );
}
