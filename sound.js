// fxr([ min, low to high, 0.261, , eco/loop, base, , base, , , , , , 0.2292, , gap, , , volume, , , , , 0.5])

const fxr = jsfxr;
// {
//   "wave_type": 0,
//   "p_env_attack": 0,
//   "p_env_sustain": 0.2670385903098772,
//   "p_env_punch": 0.05617956910096315,
//   "p_env_decay": 0.18986499130207468,
//   "p_base_freq": 0.5647023723619587,
//   "p_freq_limit": 0.09297810379015797,
//   "p_freq_ramp": -0.37469340132924134,
//   "p_freq_dramp": 0,
//   "p_vib_strength": 0,
//   "p_vib_speed": 0,
//   "p_arp_mod": 0,
//   "p_arp_speed": 0,
//   "p_duty": 0.46341027555479475,
//   "p_duty_ramp": 0.011805708722830844,
//   "p_repeat_speed": 0,
//   "p_pha_offset": 0,
//   "p_pha_ramp": 0,
//   "p_lpf_freq": 1,
//   "p_lpf_ramp": 0,
//   "p_lpf_resonance": 0,
//   "p_hpf_freq": 0.2879690537773631,
//   "p_hpf_ramp": 0,
//   "sound_vol": 0.25
// }

const blast1 = new Audio(
  fxr([
    2, 0, 0.2670385903098772, 0.05617956910096315, 0.18986499130207468,
    0.5647023723619587, 0.09297810379015797, -0.37469340132924134, 0, 0, 0, 0,
    0, 0.46341027555479475, 0.011805708722830844, 0, 0, 0, 1, 0, 0,
    0.2879690537773631, 0, 1,
  ])
);
blast1.volume = 0.2;
const blast2 = new Audio(
  fxr([
    2, 0, 0.2670385903098772, 0.05617956910096315, 0.18986499130207468,
    0.5647023723619587, 0.09297810379015797, -0.37469340132924134, 0, 0, 0, 0,
    0, 0.46341027555479475, 0.011805708722830844, 0, 0, 0, 1, 0, 0,
    0.2879690537773631, 0, 1,
  ])
);
blast2.volume = 0.3; 

const dead = new Audio(
  fxr([2, , 0.261, , 0.8055, 0.4874, , 0.1788, , , , , , 0.2292, , 0.5519, , , 1, , , , , 1])
);
dead.volume = 0.5; 

const fire = new Audio(
  fxr([
    1, 0, 0.15918762687061033, 0, 0.01083522866497324, 0.7790439549235985,
    0.08468997884548812, -0.5359051778033788, 0, 0, 0, 0, 0,
    0.09432739790669697, 0.09677376191734136, 0, 0.09305215671942518,
    -0.15834887004408374, 1, 0, 0, 0.26086179211502153, 0, 1,
  ])
);
fire.volume = 0.02;

const Sounds = {
  blast1() {
    blast1.play();
    blast1.currentTime = 0;
  },
  blast2() {
    blast2.play();
    blast2.currentTime = 0;
  },
  fire() {
    fire.play();
    fire.currentTime = 0;
  },
  dead() {
    dead.play();
  },
};
