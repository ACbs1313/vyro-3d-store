import "./globals.css";

export const metadata = {
  title: "VYRO — Made to Order. Printed for You.",
  description: "Premium made-to-order 3D printed products."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
