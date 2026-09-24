// Web Audio API Synthesizer for traditional Mid-Autumn pentatonic melodies and sound effects
// Completely zero-dependency and plays cleanly in modern browsers

class SoundController {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.masterGain = null;
    this.noteIndex = 0;
    this.isMuted = false;

    // Traditional Pentatonic Scale Frequencies (F, G, A, C, D in various octaves)
    // Famous Vietnamese Mid-Autumn motif ("Chiếc đèn ông sao sao năm cánh tươi màu...")
    // In G Major Pentatonic: G4, A4, B4, D5, E5, G5, etc.
    this.melody = [
      { note: 'D5', dur: 0.4 },
      { note: 'B4', dur: 0.4 },
      { note: 'G4', dur: 0.4 },
      { note: 'A4', dur: 0.4 },
      { note: 'B4', dur: 0.6 },
      { note: 'D5', dur: 0.6 },
      { note: 'E5', dur: 0.4 },
      { note: 'D5', dur: 0.4 },
      { note: 'B4', dur: 0.8 },

      { note: 'D5', dur: 0.4 },
      { note: 'E5', dur: 0.4 },
      { note: 'G5', dur: 0.6 },
      { note: 'E5', dur: 0.4 },
      { note: 'D5', dur: 0.6 },
      { note: 'B4', dur: 0.4 },
      { note: 'A4', dur: 0.6 },
      { note: 'G4', dur: 1.0 },

      { note: 'B4', dur: 0.3 },
      { note: 'D5', dur: 0.3 },
      { note: 'E5', dur: 0.5 },
      { note: 'D5', dur: 0.4 },
      { note: 'B4', dur: 0.4 },
      { note: 'A4', dur: 0.4 },
      { note: 'G4', dur: 0.8 },
      { note: 'A4', dur: 0.4 },
      { note: 'B4', dur: 0.6 },
      { note: 'G4', dur: 1.2 }
    ];

    this.freqs = {
      'G3': 196.00, 'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'D4': 293.66,
      'E4': 329.63, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
      'D5': 587.33, 'E5': 659.25, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'C6': 1046.50, 'D6': 1174.66
    };
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPluck(freq, duration = 1.0, gainVal = 0.25, type = 'sine') {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Harmonic overtone for zither / đàn tranh shimmer
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(gainVal, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  stepMelody = () => {
    if (!this.isPlaying || this.isMuted) return;
    const item = this.melody[this.noteIndex];
    if (item && this.freqs[item.note]) {
      this.playPluck(this.freqs[item.note], item.dur * 2.2, 0.2, 'sine');

      // occasionally add low root bass drone note
      if (this.noteIndex % 4 === 0) {
        this.playPluck(this.freqs['G3'], 1.8, 0.15, 'triangle');
      }
    }

    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
    const nextWait = (item ? item.dur : 0.5) * 650;
    this.timer = setTimeout(this.stepMelody, nextWait);
  };

  toggleBgm() {
    this.init();
    if (this.isPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  startBgm() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.stepMelody();
  }

  stopBgm() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  // Chime sound when card opens
  playOpenChime() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const chords = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C E G C E
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playPluck(freq, 2.0, 0.22, 'sine');
      }, idx * 110);
    });
  }

  // Swoosh & warm glow sound when lantern is released
  playLanternSwoosh() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 1.2);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 1.5);

    // Chime finish
    setTimeout(() => {
      this.playPluck(987.77, 1.5, 0.2, 'triangle');
    }, 700);
  }

  // Sparkling firework pop sound
  playFirework() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600 + Math.random() * 400, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.4);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.45);
  }
}

export const sound = new SoundController();
