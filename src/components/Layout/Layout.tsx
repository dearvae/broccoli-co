import React, { ReactNode, useState } from 'react';
import styles from './Layout.module.css';
import RequestInviteModal from '../RequestInviteModal/RequestInviteModal';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className={styles.container}>
                <div className="w-full py-8 px-8 bg-white shadow-sm">
                    <h1 className="text-3xl font-bold text-gray-800 text-left">Broccoli & Co.</h1>
                </div>
                <main className={styles.content}>{children}</main>
                <div className="w-full py-8 mt-auto text-center text-gray-600 bg-gray-100">
                    <p>Made with ❤️ in Melbourne.</p>
                    <p>© 2016 Broccoli & Co. All rights reserved.</p>
                </div>
            </div>
        </>
    );
};

export default Layout;
