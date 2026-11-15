class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  private ensureContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  private playTone(
    freqStart: number,
    freqEnd: number,
    duration: number,
    type: OscillatorType = 'sine',
    delay = 0,
    gainPeak = 0.14
  ) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, startTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), startTime + duration);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(gainPeak, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  public playKey() {
    this.playTone(540, 620, 0.05, 'sine', 0, 0.08);
  }

  public playErase() {
    this.playTone(340, 260, 0.05, 'sine', 0, 0.07);
  }

  public playWordSolved() {
    this.playTone(523.25, 523.25, 0.1, 'triangle', 0, 0.15);
    this.playTone(659.25, 659.25, 0.1, 'triangle', 0.08, 0.15);
    this.playTone(783.99, 1046.5, 0.22, 'triangle', 0.16, 0.18);
  }

  public playTryAgain() {
    this.playTone(280, 190, 0.16, 'sine', 0, 0.12);
    this.playTone(220, 160, 0.18, 'sine', 0.1, 0.1);
  }

  public playVictoryFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
    const times = [0, 0.11, 0.22, 0.34, 0.52, 0.65];
    const durs = [0.12, 0.12, 0.12, 0.2, 0.12, 0.38];
    notes.forEach((n, idx) => {
      this.playTone(n, n, durs[idx], 'triangle', times[idx], 0.18);
    });
  }

  public playClueSound(
    soundId?: 'kucing' | 'kambing' | 'ayam' | 'sapi' | 'gajah' | 'katak' | 'ekolokasi'
  ) {
    if (!soundId || this.muted) return;
    switch (soundId) {
      case 'kucing':
        this.playTone(620, 920, 0.15, 'triangle', 0, 0.16);
        this.playTone(920, 490, 0.26, 'triangle', 0.14, 0.16);
        break;
      case 'kambing':
        this.playTone(340, 310, 0.08, 'sawtooth', 0, 0.09);
        this.playTone(360, 320, 0.08, 'sawtooth', 0.09, 0.09);
        this.playTone(340, 290, 0.12, 'sawtooth', 0.18, 0.09);
        break;
      case 'ayam':
        this.playTone(520, 560, 0.09, 'triangle', 0, 0.15);
        this.playTone(580, 620, 0.09, 'triangle', 0.11, 0.15);
        this.playTone(720, 860, 0.12, 'triangle', 0.22, 0.16);
        this.playTone(860, 640, 0.25, 'triangle', 0.35, 0.16);
        break;
      case 'sapi':
        this.playTone(155, 130, 0.48, 'sawtooth', 0, 0.1);
        this.playTone(232, 195, 0.48, 'triangle', 0, 0.09);
        break;
      case 'gajah':
        this.playTone(260, 580, 0.22, 'sawtooth', 0, 0.11);
        this.playTone(580, 420, 0.28, 'sawtooth', 0.2, 0.1);
        break;
      case 'katak':
        this.playTone(180, 420, 0.09, 'triangle', 0, 0.15);
        this.playTone(190, 480, 0.11, 'triangle', 0.15, 0.15);
        break;
      case 'ekolokasi':
        this.playTone(1250, 1750, 0.06, 'sine', 0, 0.12);
        this.playTone(1400, 1900, 0.06, 'sine', 0.1, 0.12);
        this.playTone(1200, 1800, 0.12, 'sine', 0.2, 0.12);
        break;
    }
  }
}

export const soundEngine = new SoundEngine();
