import { useCallback, useRef } from 'react';

/**
 * Hook for playing UI sound effects
 * Uses Web Audio API to generate a pleasant click sound
 */
export function useSound() {
  const audioContextRef = useRef(null);

  const playClickSound = useCallback(() => {
    try {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;

      // Create oscillator for the sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure the sound - a pleasant, subtle click
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Higher pitch
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.05);

      // Volume envelope - quick attack and decay
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime); // Subtle volume
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      // Play the sound
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Silently fail if audio context is not supported
      console.warn('Sound playback failed:', error);
    }
  }, []);

  const playSuccessSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;

      // Create two tones for a pleasant success sound
      const playTone = (frequency, startTime, duration) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration);

        oscillator.start(audioContext.currentTime + startTime);
        oscillator.stop(audioContext.currentTime + startTime + duration);
      };

      // Play two ascending tones
      playTone(523.25, 0, 0.1);     // C5
      playTone(659.25, 0.1, 0.15);  // E5
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }, []);

  return {
    playClickSound,
    playSuccessSound,
  };
}
