// Enhanced Web Audio Synthesizer for High-End Broadcast Stingers & Notification SFX

class AudioSynthManager {
  private ctx: AudioContext | null = null;
  private fanOscillator: OscillatorNode | null = null;
  private fanGain: GainNode | null = null;
  private isFanHumming = false;

  private getContext(): AudioContext | null {
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

  // Premium TV News Stinger (صدای حرفه‌ای و پرقدرت اعلام خبر فوری)
  public playBreakingNewsChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Sub-Bass Cinematic Boom (ضربه کوبنده و سنگین باس)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(110, now);
    subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.6);

    subGain.gain.setValueAtTime(0.7, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.8);

    // 2. Brass / Synth Hit (آکورد تنش‌زای برنجی تلویزیونی)
    [196, 246.94, 293.66, 392].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + 0.05);

      // Lowpass filter for broadcast warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.5);

      gain.gain.setValueAtTime(0.18, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + 0.05);
      osc.stop(now + 0.65);
    });

    // 3. Crisp Signature Broadcast Alert Chimes (زنگ‌های بلوری خبر فوری)
    const chimeNotes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
    chimeNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.2 + idx * 0.08);

      gain.gain.setValueAtTime(0.28, now + 0.2 + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9 + idx * 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + 0.2 + idx * 0.08);
      osc.stop(now + 1.2);
    });
  }

  // Modern UI Notification Ping (صدای نوتیفیکیشن زلال و جذاب)
  public playNotificationPing() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(659.25, now); // E5
    osc1.frequency.exponentialRampToValueAtTime(987.77, now + 0.12); // B5

    osc2.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.08);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  }

  // Set fan ambient motor hum based on speed
  public setFanHum(speed: number) {
    const ctx = this.getContext();
    if (!ctx) return;

    if (speed === 0) {
      if (this.fanGain) {
        this.fanGain.gain.setValueAtTime(0, ctx.currentTime);
      }
      this.isFanHumming = false;
      return;
    }

    const freqMap: Record<number, number> = {
      1: 58,   // Soft low drone
      2: 85,   // Medium hum
      3: 115,  // Fast turbo drone
    };

    const targetFreq = freqMap[speed] || 60;
    const targetVolume = speed === 1 ? 0.03 : speed === 2 ? 0.06 : 0.09;

    if (!this.fanOscillator || !this.isFanHumming) {
      this.fanOscillator = ctx.createOscillator();
      this.fanGain = ctx.createGain();
      this.fanOscillator.type = 'triangle';
      this.fanOscillator.frequency.setValueAtTime(targetFreq, ctx.currentTime);

      this.fanGain.gain.setValueAtTime(0.01, ctx.currentTime);
      this.fanGain.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 0.4);

      this.fanOscillator.connect(this.fanGain);
      this.fanGain.connect(ctx.destination);
      this.fanOscillator.start();
      this.isFanHumming = true;
    } else if (this.fanOscillator && this.fanGain) {
      this.fanOscillator.frequency.linearRampToValueAtTime(targetFreq, ctx.currentTime + 0.2);
      this.fanGain.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 0.2);
    }
  }

  // Childhood Fan voice simulation ("آآآآآآآآ")
  public playFanVoiceSimulation(durationSec = 3.5) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const mainGain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);

    lfo.frequency.setValueAtTime(18, now);
    lfoGain.gain.setValueAtTime(0.2, now);

    lfo.connect(lfoGain);
    lfoGain.connect(mainGain.gain);

    mainGain.gain.setValueAtTime(0.25, now);
    mainGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    osc.connect(mainGain);
    mainGain.connect(ctx.destination);

    lfo.start(now);
    osc.start(now);

    lfo.stop(now + durationSec);
    osc.stop(now + durationSec);
  }
}

export const audioSynth = new AudioSynthManager();
