import { FaCoffee, FaMinus, FaPlus } from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";

export const CoffeeTracker = () => {
  const [coffeeCount, setCoffeeCount] = useLocalStorage('coffeeCount', 0);

  const increment = () => setCoffeeCount(prev => prev + 1);
  const decrement = () => setCoffeeCount (prev => prev > 0 ? prev - 1: 0);

return (
     <div className='backdrop-blur-xl bg-black/20 border border-white/10 p-4 rounded-2xl shadow-2xl'>
                <div className="space-y-3">
                  <h3 className="font-mono text-sm text-amber-400 flex items-center gap-2">
                    <FaCoffee className='h-4 w-4'/>
                    COFFEE TRACKER
                  </h3>
                    <div className="flex items-center justify-between">
                      <button onClick={decrement} className='w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center'>
                        <FaMinus className='h-3 w-3'/>
                      </button>

                        <div className="flex items-center gap-1">
                          {[...Array(Math.min(coffeeCount, 5))].map((_, i) => (
                            <FaCoffee key={i} className="w-8 h-8 text-amber-400" />
                          ))}
                          {coffeeCount > 5 && <span className="text-amber-400 font-mono text-lg">+{coffeeCount - 5}</span>}
                          {coffeeCount === 0 && <span className="text-gray-400 font-mono text-sm">No coffee yet</span>}
                        </div>
                        {coffeeCount > 0 && (
                          <p className="text-white font-mono text-center text-sm">
                            {coffeeCount} cup{coffeeCount !== 1 ? "s" : ""} today
                          </p>
                        )}
                      </div>

                      <button onClick={increment} className='w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center'>
                        <FaPlus className='h-3 w-3'/>
                      </button>
                    </div>
              </div>
  );
};
