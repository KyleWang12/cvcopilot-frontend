export const metadata = {
  title: 'CVCopilot',
  description: 'CVCopilot is a tool that helps you write your resume.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
