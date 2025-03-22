import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { Button } from 'antd';
import RequestInviteModal from './components/RequestInviteModal/RequestInviteModal';

function App() {
    const [isRequestInviteModalOpen, setIsRequestInviteModalOpen] = useState(false);

    return (
        <>
            <Layout>
                <h1>A better way to enjoy every day.</h1>
                <h3>Be the first to know when we launch.</h3>
                <Button onClick={() => setIsRequestInviteModalOpen(true)}>Request an invite</Button>
            </Layout>
            <RequestInviteModal
                visible={isRequestInviteModalOpen}
                onHide={() => setIsRequestInviteModalOpen(false)}
            />
        </>
    );
}

export default App;
