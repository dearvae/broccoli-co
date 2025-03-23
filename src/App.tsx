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
                <div className="text-center flex flex-col items-center justify-center">
                    <div className="max-w-md gap-8 text-center flex flex-col">
                        <div className="text-4xl font-bold text-gray-800">
                            A better way to enjoy every day.
                        </div>
                        <div className="text-lg text-gray-600">
                            Be the first to know when we launch.
                        </div>
                        <div>
                            <Button onClick={() => setIsRequestInviteModalOpen(true)}>
                                Request an invite
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout>
            <RequestInviteModal
                visible={isRequestInviteModalOpen}
                onHide={() => setIsRequestInviteModalOpen(false)}
            />
        </>
    );
}

export default App;
