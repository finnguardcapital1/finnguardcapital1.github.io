import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/assets/logo.png" alt="FiNNGUARD Capital" className="h-12 w-auto" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">About Us</Link>
            <Link to="/emi-calculator" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">EMI Calculator</Link>
            <Link to="/contact" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">Contact</Link>
          </nav>
        </div>
      </header>
      <section className="py-16 px-4 text-center">
        <h1 className="text-5xl font-bold text-slate-800 mb-6">About FiNNGUARD Capital</h1>
        <p className="text-xl text-slate-600">Trusted loan facilitation in Thrissur, Kerala</p>
      </section>
    </div>
  );
}
