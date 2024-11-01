import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';

const GreenCheckmark = () => {
  return (
    <Svg height="100" width="100" viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="50" fill="#4CAF50" opacity="0.2" />
      <Circle cx="50" cy="50" r="40" fill="#4CAF50" opacity="0.4" />
      <Circle cx="50" cy="50" r="30" fill="#4CAF50" opacity="0.8" />
      
      {/* Checkmark */}
      <Path
        d="M34.5 50l9 9 22.5-22.5"
        stroke="white"
        strokeWidth="8"
        fill="none"
      />
    </Svg>
  );
};

export default GreenCheckmark;
