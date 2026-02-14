# Lottie Animation Files

This directory should contain Lottie JSON animation files for the travel character.

## Required Files

- `plane.json` - Plane animation
- `train.json` - Train animation  
- `bike.json` - Bicycle animation
- `car.json` - Car animation
- `swing.json` - Swinging activity animation
- `snorkeling.json` - Snorkeling activity animation

## Animation Requirements

- Minimal, flat, line-based style
- Similar scale and style across all animations
- 80-120px recommended size
- Loop-friendly animations
- Travel-themed movements

## Where to Get Lottie Files

1. **LottieFiles.com** - Free Lottie animations
2. **After Effects** - Export using Bodymovin plugin
3. **Design tools** - Use Lottie export plugins

## Current Implementation

The component currently uses emoji-based placeholders. Replace the `SimpleTravelIcon` component in `TravelCharacter.tsx` with actual Lottie animations once files are available.

Example usage:
```tsx
import planeAnimation from '../assets/lottie/plane.json';
<Lottie animationData={planeAnimation} loop={true} />
```
