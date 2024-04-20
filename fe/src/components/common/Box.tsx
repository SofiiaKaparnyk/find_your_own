import { CSSProperties, PropsWithChildren } from 'react';

export default function Box({
  children,
  style,
}: PropsWithChildren & { style?: CSSProperties }) {
  return (
    <div
      style={{
        padding: '16px',
        background: 'var(--darkBlue)',
        borderRadius: '10px',
        boxShadow:
          'rgb(0 53 86 / 75%) 5px 5px 17px -10px, rgb(0 53 86 / 75%) -5px -5px 17px -10px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
