import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundEngine } from '../utils/sound';

interface RollingCounterProps {
  phrases?: string[];
  autoPlayInterval?: number;
}

const DEFAULT_RAW_PHRASES = [
  'ALS INFONET',
  'SOFTWARE',
  'AI SOLUTIONS',
  'INNOVATION',
  'DIGITAL FUTURE'
];

const SLOT_COUNT = 14;

// Centered slot formatting for 14 characters
function formatToSlots(text: string, totalSlots: number): string {
  const clean = text.toUpperCase();
  if (clean.length >= totalSlots) {
    return clean.slice(0, totalSlots);
  }
  const diff = totalSlots - clean.length;
  const padLeft = Math.floor(diff / 2);
  const padRight = diff - padLeft;
  return ' '.repeat(padLeft) + clean + ' '.repeat(padRight);
}

const TUMBLER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -';

export const RollingCounter: React.FC<RollingCounterProps> = ({
  phrases = DEFAULT_RAW_PHRASES,
  autoPlayInterval = 4800
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knobRotation, setKnobRotation] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const formattedPhrases = useRef(phrases.map(p => formatToSlots(p, SLOT_COUNT))).current;

  // Track each reel's animation state
  const [slotsState, setSlotsState] = useState<{
    char: string;
    targetChar: string;
    strip: string[];
    isRolling: boolean;
    delay: number;
    duration: number;
  }[]>(() => {
    const initialFormatted = formatToSlots(phrases[0], SLOT_COUNT);
    return initialFormatted.split('').map((c) => ({
      char: c,
      targetChar: c,
      strip: [c],
      isRolling: false,
      delay: 0,
      duration: 0.65
    }));
  });

  const isTransitioningRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const triggerNextPhrase = useCallback((targetIndexOverride?: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const nextIdx = targetIndexOverride !== undefined 
      ? targetIndexOverride 
      : (currentIndex + 1) % phrases.length;

    setCurrentIndex(nextIdx);
    setKnobRotation(prev => prev + 45);

    if (soundEnabled) {
      soundEngine.playKnobTurn();
    }

    const nextTargetString = formattedPhrases[nextIdx];

    if (prefersReducedMotion) {
      setSlotsState(
        nextTargetString.split('').map((c) => ({
          char: c,
          targetChar: c,
          strip: [c],
          isRolling: false,
          delay: 0,
          duration: 0
        }))
      );
      isTransitioningRef.current = false;
      return;
    }

    // Build mechanical tumbler strips for each character
    const newSlots = slotsState.map((prevSlot, i) => {
      const targetChar = nextTargetString[i] || ' ';
      const startChar = prevSlot.targetChar;

      // Tumbler intermediate count
      const intermediateCount = (targetChar === ' ' && startChar === ' ') ? 0 : 4;
      const intermediates: string[] = [];

      for (let k = 0; k < intermediateCount; k++) {
        const randIndex = Math.floor(Math.random() * TUMBLER_CHARS.length);
        intermediates.push(TUMBLER_CHARS[randIndex]);
      }

      const strip = [startChar, ...intermediates, targetChar];
      // Stagger wave across reels
      const staggerDelay = i * 0.038;
      const duration = 0.6 + (i * 0.015);

      return {
        char: startChar,
        targetChar,
        strip,
        isRolling: strip.length > 1,
        delay: staggerDelay,
        duration
      };
    });

    setSlotsState(newSlots);

    // Subtle audio cascade matching mechanical flappers
    if (soundEnabled) {
      for (let i = 0; i < SLOT_COUNT; i += 2) {
        setTimeout(() => {
          soundEngine.playMechanicalClick(0.95 + (i * 0.025));
        }, i * 36 + 70);
      }
    }

    // Settle transition
    const maxDuration = (SLOT_COUNT * 0.038 + 0.75) * 1000;
    setTimeout(() => {
      setSlotsState(
        nextTargetString.split('').map((c) => ({
          char: c,
          targetChar: c,
          strip: [c],
          isRolling: false,
          delay: 0,
          duration: 0.65
        }))
      );
      isTransitioningRef.current = false;
    }, maxDuration);
  }, [currentIndex, phrases.length, formattedPhrases, prefersReducedMotion, soundEnabled, slotsState]);

  // Autoplay cycle
  useEffect(() => {
    timerRef.current = setInterval(() => {
      triggerNextPhrase();
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlayInterval, triggerNextPhrase]);

  const handleKnobClick = () => {
    triggerNextPhrase();
  };

  const handlePhraseSelect = (idx: number) => {
    if (idx === currentIndex || isTransitioningRef.current) return;
    triggerNextPhrase(idx);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.enabled = next;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Mechanical Counter Display Enclosure */}
      <div 
        className="relative w-full max-w-5xl bg-[#0D0D0D] p-2 sm:p-3 md:p-3.5 border border-black shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
      >
        {/* Corner mechanical fixings */}
        <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-neutral-600 rounded-none pointer-events-none" />
        <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-neutral-600 rounded-none pointer-events-none" />
        <div className="absolute bottom-1.5 left-1.5 w-1 h-1 bg-neutral-600 rounded-none pointer-events-none" />
        <div className="absolute bottom-1.5 right-1.5 w-1 h-1 bg-neutral-600 rounded-none pointer-events-none" />

        {/* Counter Internal Rack */}
        <div className="flex items-center justify-between w-full bg-[#1A1A1A] p-1 gap-[2px] sm:gap-[3px] border border-neutral-800">
          {slotsState.map((slot, index) => {
            return (
              <div
                key={`reel-${index}`}
                className="relative flex-1 min-w-0 h-14 sm:h-20 md:h-24 lg:h-28 bg-[#FFFFFF] overflow-hidden flex items-center justify-center select-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]"
              >
                {/* Physical split flap center hinge cut */}
                <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-neutral-900/40 z-20 pointer-events-none" />
                <div className="absolute top-[calc(50%-1px)] left-0 right-0 h-[1px] bg-white/60 z-20 pointer-events-none" />

                {/* Subtle depth vignette */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/15 via-transparent to-black/25 z-10" />

                {/* Vertical rolling character strip */}
                <div
                  className="w-full flex flex-col items-center text-center font-display font-black text-black tracking-tight"
                  style={{
                    transform: slot.isRolling 
                      ? `translateY(-${(slot.strip.length - 1) * 100}%)`
                      : 'translateY(0%)',
                    transition: slot.isRolling 
                      ? `transform ${slot.duration}s cubic-bezier(0.19, 0.9, 0.22, 1) ${slot.delay}s`
                      : 'none',
                    willChange: 'transform'
                  }}
                >
                  {slot.strip.map((c, charIdx) => (
                    <div
                      key={`char-${index}-${charIdx}`}
                      className="w-full h-14 sm:h-20 md:h-24 lg:h-28 flex items-center justify-center shrink-0 text-base sm:text-2xl md:text-4xl lg:text-5xl"
                    >
                      <span className={c === ' ' ? 'opacity-0' : 'opacity-100 font-extrabold text-[#111111]'}>
                        {c === ' ' ? '·' : c}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tactile Control Unit Below Counter */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl px-2 gap-4">
        {/* Left: Active Phrase Indicator & Direct Jumps */}
        <div className="flex items-center gap-4 text-xs font-mono-tech">
          <span className="text-black font-bold tracking-widest text-[11px]">
            [ 0{currentIndex + 1} / 0{phrases.length} ]
          </span>
          <div className="flex items-center gap-1">
            {phrases.map((phrase, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePhraseSelect(idx)}
                className={`h-1.5 transition-all duration-300 cursor-pointer ${
                  idx === currentIndex 
                    ? 'w-8 bg-black' 
                    : 'w-2 bg-black/25 hover:bg-black/60'
                }`}
                aria-label={`Jump to phrase ${idx + 1}: ${phrase}`}
              />
            ))}
          </div>
        </div>

        {/* Center: Tactile Physical Knob Control */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleKnobClick}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#151515] border border-neutral-700 shadow-xl transition-transform active:scale-95 cursor-pointer"
            title="Click to cycle next phrase"
            aria-label="Advance mechanical reel phrase"
          >
            {/* Outer knurled metal rim ring */}
            <div className="absolute inset-1 rounded-full border border-neutral-600/60 pointer-events-none" />

            {/* Rotating central core with directional notch */}
            <div
              className="relative w-7 h-7 rounded-full bg-[#0A0A0A] border border-neutral-800 flex items-center justify-center transition-transform duration-500 ease-out"
              style={{ transform: `rotate(${knobRotation}deg)` }}
            >
              <div className="absolute top-1 w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            </div>
          </button>
          
          <div className="text-left select-none hidden sm:block">
            <span className="block text-[10px] font-mono-tech tracking-wider text-black font-bold uppercase">
              NEXT REEL
            </span>
            <span className="block text-[10px] text-black/70 font-mono-tech">
              CLICK DIAL
            </span>
          </div>
        </div>

        {/* Right: Discreet Audio Toggle */}
        <div className="flex items-center text-[10px] font-mono-tech">
          <button
            type="button"
            onClick={toggleSound}
            className="text-black/80 hover:text-black font-semibold uppercase tracking-wider py-1 px-2 border border-black/20 hover:border-black transition-colors"
          >
            AUDIO: {soundEnabled ? 'ON' : 'MUTED'}
          </button>
        </div>
      </div>
    </div>
  );
};
