import { CSSProperties, PropsWithChildren } from 'react';

const containerStyles: CSSProperties = {
  maxWidth: '1280px',
  width: '100%',
  marginInline: 'auto',
  height: '100%',
  padding: '16px',
  position: 'relative',
  background: 'white',
};

export default function PageWrapper({
  style,
  children,
}: PropsWithChildren<{ style?: CSSProperties }>) {
  return (
    <div
      style={{
        ...containerStyles,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
