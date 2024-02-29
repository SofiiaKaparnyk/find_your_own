import React from 'react';
import Map from './MainMap';

export default function Home() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <Map />
    </div>
  );
}
