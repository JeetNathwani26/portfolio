class AudioSynth {
  constructor() {
    this.ctx = null;
    this.droneGain = null;
    this.droneOscs = [];
    this.droneFilter = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
  }

  // Generate white noise buffer for whoosh/wind effects
  createNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2.5; // 2.5 seconds duration
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  playWhoosh() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const noise = this.ctx.createBufferSource();
    const noiseBuffer = this.createNoiseBuffer();
    if (!noiseBuffer) return;
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 3.5;

    const gain = this.ctx.createGain();

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    const now = this.ctx.currentTime;

    // Whoosh filter sweep (rising then falling)
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.exponentialRampToValueAtTime(1600, now + 0.8);
    filter.frequency.exponentialRampToValueAtTime(180, now + 2.0);

    // Whoosh volume envelope (fade in, peak, fade out)
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    noise.start(now);
    noise.stop(now + 2.3);
  }

  startDrone() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    // Create main gain node for drone
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.linearRampToValueAtTime(0.15, now + 1.2);

    // Lowpass filter with resonance
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = "lowpass";
    this.droneFilter.frequency.setValueAtTime(140, now);
    this.droneFilter.Q.value = 4.0;

    // Animate filter frequency for cinematic movement
    this.droneFilter.frequency.linearRampToValueAtTime(380, now + 2.0);
    this.droneFilter.frequency.linearRampToValueAtTime(220, now + 4.0);

    // Delay for spatial depth
    const delay = this.ctx.createDelay(1.0);
    delay.delayTime.value = 0.35;
    const delayGain = this.ctx.createGain();
    delayGain.gain.value = 0.35;

    // Connect delay circuit
    this.droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    this.droneGain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(this.ctx.destination);
    delayGain.connect(delay); // feedback loop

    // Create 4 detuned oscillators for a rich minor chord (C2, G2, C3, Eb3)
    const freqs = [65.41, 98.0, 130.81, 155.56];
    this.droneOscs = freqs.map((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sawtooth" : "triangle";
      osc.frequency.value = freq;
      osc.detune.value = (Math.random() - 0.5) * 12; // chorusing detune
      osc.connect(this.droneFilter);
      osc.start(now);
      return osc;
    });
  }

  stopDrone() {
    if (!this.ctx || !this.droneGain) return;
    const now = this.ctx.currentTime;
    try {
      this.droneGain.gain.cancelScheduledValues(now);
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      const oscsToStop = this.droneOscs;
      this.droneOscs = [];
      this.droneGain = null;
      this.droneFilter = null;

      setTimeout(() => {
        oscsToStop.forEach(osc => {
          try { osc.stop(); } catch (e) { }
        });
      }, 1100);
    } catch (e) { }
  }

  playPassby(panValue) {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    let panner;
    if (this.ctx.createStereoPanner) {
      panner = this.ctx.createStereoPanner();
      panner.pan.setValueAtTime(-panValue, now);
      panner.pan.linearRampToValueAtTime(panValue, now + 0.8);
    }

    osc.type = "sine";
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.5);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    if (panner) {
      osc.connect(panner);
      panner.connect(gain);
    } else {
      osc.connect(gain);
    }
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  playLanding() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. Sub Bass Boom impact
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(60, now); // B1/C2 range
    subOsc.frequency.linearRampToValueAtTime(40, now + 0.7);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.3);

    // 2. Chime (high pristine metallic bell tone)
    const chimeFreqs = [950, 1425, 1900];
    chimeFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.02 / (idx + 1), now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.1);
    });
  }
}

export const audioSynth = new AudioSynth();
