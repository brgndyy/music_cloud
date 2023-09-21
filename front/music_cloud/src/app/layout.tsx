import "./globals.css";
import type { Metadata } from "next";
import MainCard from "./_components/composables/Card/MainCard";
import Header from "./_components/Header/Header";
import ContentCard from "./_components/composables/Card/ContentCard";
import Footer from "./_components/composables/Footer/Footer";

export const metadata: Metadata = {
  title: "Sound Cloud",
  description: "사운드 클라우드 데모",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainCard>
          <Header />
          <ContentCard>{children}</ContentCard>
          <Footer />
        </MainCard>
      </body>
    </html>
  );
}
