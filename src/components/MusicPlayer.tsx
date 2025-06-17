import { useState } from 'react';
import { FaMusic, FaVolumeDown } from 'react-icons/fa';
import { FaVolumeHigh } from 'react-icons/fa6';

export const MusicPlayer = () => {

    const [showMusic, setShowMusic] = useState(false);

  return (
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 p-6 rounded-2xl shadow-2xl">
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <h3 className="font-mono text-xl text-purple-400 flex items-center gap-2">
                     <FaMusic className="w-4 h-4" />
                     // MUSIC PLAYER
                   </h3>
                   <button
                     onClick={() => setShowMusic(!showMusic)}
                     className="text-white hover:bg-white/10 rounded-lg px-4 py-2 font-mono transition-all flex items-center gap-2"
                   >
                     {showMusic ? <FaVolumeHigh className="w-4 h-4" /> : <FaVolumeDown className="w-4 h-4" />}
                     {showMusic ? "HIDE" : "SHOW"}
                   </button>
                 </div>

                 {showMusic ? (
                   <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
                     <iframe
                       width="100%"
                       height="100%"
                       src="https://www.youtube.com/embed/jfKfPfyJRdk"
                       title="YouTube music playlist"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                     ></iframe>
                   </div>
                 ) : (
                   <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center">
                     <p className="text-gray-400 font-mono text-sm">Click SHOW to display the music player</p>
                   </div>
                 )}
                 <p className="text-xs text-gray-400 font-mono">Lofi beats to help you focus and be productive</p>
               </div>
             </div>
  )
}

