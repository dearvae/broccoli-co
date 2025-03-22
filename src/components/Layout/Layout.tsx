import React, { ReactNode } from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>Fixed Header</header>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>Sticky Footer</footer>
    </div>
  );
};

export default Layout;
