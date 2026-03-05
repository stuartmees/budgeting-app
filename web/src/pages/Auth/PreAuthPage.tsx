import { Link } from 'react-router-dom';

export default function PreAuthPage() {
  return (
    <div>
      <h1>Welcome to Budget App</h1>
      <p>Track your monthly and weekly budgets.</p>
      <div>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/sign-in">
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
}
