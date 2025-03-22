import React, { ReactNode, useState } from 'react';
import styles from './Layout.module.css';
import RequestInviteModal from '../RequestInviteModal/RequestInviteModal';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isRequestInviteModalOpen, setIsRequestInviteModalOpen] = useState(false);

    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>Fixed Header</header>
                <main className={styles.content}>{children}</main>
                <footer className={styles.footer}>Sticky Footer</footer>
            </div>
            <RequestInviteModal
                visible={isRequestInviteModalOpen}
                onHide={() => setIsRequestInviteModalOpen(false)}
            />
        </>
    );
};

export default Layout;
