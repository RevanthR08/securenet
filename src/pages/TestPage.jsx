import { useEffect } from 'react';

const TestPage = () => {
    useEffect(() => {
        console.log('TestPage mounted successfully');
    }, []);

    return (
        <div style={{ padding: '2rem', backgroundColor: '#fff', minHeight: '100vh' }}>
            <h1 style={{ color: '#000', fontSize: '24px' }}>Test Page</h1>
            <p style={{ color: '#666', fontSize: '16px' }}>
                If you can see this, React Router and basic rendering works!
            </p>
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
                <p style={{ margin: 0, color: '#333' }}>✅ React is working</p>
                <p style={{ margin: 0, color: '#333' }}>✅ Routing is working</p>
                <p style={{ margin: 0, color: '#333' }}>✅ Basic components are rendering</p>
            </div>
        </div>
    );
};

export default TestPage;
