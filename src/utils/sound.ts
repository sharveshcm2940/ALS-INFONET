/**
 * Web Audio synthetic tactile mechanical sound generator.
 * Emulates vintage split-flap / mechanical odometer clicks without external files.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playMechanicalClick(pitchFactor: number = 1.0) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const startTime = this.ctx.currentTime;
      const duration = 0.04;

      // Mechanical high-frequency transient click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650 * pitchFactor, startTime);
      osc.frequency.exponentialRampToValueAtTime(120 * pitchFactor, startTime + duration);

      // Lowpass filter to simulate enclosure damping
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, startTime);
      filter.Q.setValueAtTime(3.0, startTime);

      // Fast decay envelope
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Audio autoplay policies or quiet handling
    }
  }

  public playKnobTurn() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startTime = this.ctx.currentTime;
      const duration = 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, startTime);
      osc.frequency.exponentialRampToValueAtTime(180, startTime + duration);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Ignore
    }
  }

  public playKeySwitchPress(pitchVariation: number = 1.0) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Initial mechanical switch actuation snap
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(820 * pitchVariation, now);
      osc1.frequency.exponentialRampToValueAtTime(220 * pitchVariation, now + 0.035);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(4, now);

      gain1.gain.setValueAtTime(0.14, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc1.connect(filter);
      filter.connect(gain1);
      gain1.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.035);

      // 2. Bottom-out "thock" body resonance
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(190 * pitchVariation, now + 0.008);
      osc2.frequency.exponentialRampToValueAtTime(75 * pitchVariation, now + 0.045);

      gain2.gain.setValueAtTime(0.11, now + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc2.start(now + 0.008);
      osc2.stop(now + 0.045);
    } catch {
      // Quiet handling
    }
  }
}

export const soundEngine = new SoundEngine();
