import { Container } from "@mui/material"
import { CSSProperties, PropsWithChildren } from "react"

const containerStyles = {
  position: 'relative',
  width: '100%',
  height: 'var(--containerHeight)',
  // overflowY: 'scroll',
  padding: 3,
};

export default function PageWrapper({ style, children }: PropsWithChildren<{ style?: CSSProperties }>) {
  return (
    <Container sx={{
      ...containerStyles,
      ...style
    }} >
      {children}
    </Container>
  )
}