/**
 * Synthesizes audio effects using the Web Audio API without relying on external media assets.
 * Guarantees zero broken audio URLs or CORS issues.
 */

class SoundService {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    const saved = localStorage.getItem('quizpulse_sound_enabled');
    if (saved !== null) {
      this.soundEnabled = saved === 'true';
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    localStorage.setItem('quizpulse_sound_enabled', String(enabled));
  }

  public toggle(): boolean {
    this.setEnabled(!this.soundEnabled);
    if (this.soundEnabled) {
      this.playTick(); // subtle auditory cue that sound is now on
    }
    return this.soundEnabled;
  }

  /**
   * Distinct, authoritative game show buzzer sound for wrong answers.
   * Uses two detuned sawtooth waves with frequency modulation to produce a gritty, raspy buzz.
   */
  public playWrongBuzz() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const duration = 0.42;

      // Master gain node for the buzzer
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.28, now + 0.03);
      masterGain.gain.setValueAtTime(0.28, now + duration - 0.08);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Low-pass filter to give it weight without harsh high-frequency pierce
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);
      filter.Q.setValueAtTime(3, now);

      // Osc 1: Base low sawtooth
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(125, now);
      // Slight pitch bend downwards
      osc1.frequency.linearRampToValueAtTime(110, now + duration);

      // Osc 2: Detuned dissonant companion
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(133, now); // tritone-ish dissonance
      osc2.frequency.linearRampToValueAtTime(116, now + duration);

      // Sub oscillator for chest vibration feel
      const subOsc = ctx.createOscillator();
      subOsc.type = 'square';
      subOsc.frequency.setValueAtTime(62, now);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.15, now);

      osc1.connect(filter);
      osc2.connect(filter);
      subOsc.connect(subGain);
      subGain.connect(filter);

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      subOsc.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      subOsc.stop(now + duration);
    } catch {
      // AudioContext playback safety
    }
  }

  /**
   * Pleasant ascending crystalline chime for correct answers.
   */
  public playCorrectChime() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Notes: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.50Hz)
      const notes = [523.25, 659.25, 783.99, 1046.50];

      notes.forEach((freq, idx) => {
        const noteStart = now + idx * 0.06;
        const noteDuration = 0.35;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + noteDuration);
      });
    } catch {
      // fallback
    }
  }

  /**
   * Urgent clock tick for final seconds of question timer.
   */
  public playTick() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // fallback
    }
  }

  /**
   * Sound when time runs out on a question.
   */
  public playTimesUpBuzz() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.4);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // fallback
    }
  }

  /**
   * Cheerful fanfare when completing a quiz round.
   */
  public playFanfare() {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const chords = [
        { freqs: [523.25, 659.25, 783.99], time: 0, dur: 0.18 },
        { freqs: [587.33, 739.99, 880.00], time: 0.18, dur: 0.18 },
        { freqs: [659.25, 783.99, 1046.50], time: 0.36, dur: 0.55 },
      ];

      chords.forEach((chord) => {
        chord.freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + chord.time;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + chord.dur);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + chord.dur);
        });
      });
    } catch {
      // fallback
    }
  }
}

export const sound = new SoundService();
