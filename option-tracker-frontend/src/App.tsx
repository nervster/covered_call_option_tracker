import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Stair-Step Tracker</h1>
        
        <SignedOut>
          <SignInButton mode="modal">
            <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>

      <main>
        <SignedIn>
          <Dashboard />
        </SignedIn>
        
        <SignedOut>
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Welcome to the Strategy Engine</h2>
            <p>Please sign in to manage your options portfolio.</p>
          </div>
        </SignedOut>
      </main>
    </div>
  );
}