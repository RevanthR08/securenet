/**
 * Sentinel-X Chrome Extension Integration (Content Script Bridge)
 * 
 * This uses window.postMessage to communicate with a content script,
 * which then forwards the message to the extension background.
 * 
 * Benefits:
 * - No Extension ID dependency
 * - Works even when service worker sleeps
 * - No externally_connectable configuration needed
 * - Production-grade, industry standard approach
 */

/**
 * Syncs authentication to Sentinel-X Chrome Extension
 * @param {string} token - JWT authentication token
 * @param {object} user - User profile object with id, username, etc.
 */
export const connectToExtension = (token, user) => {
    console.log('🔌 Syncing auth to Sentinel-X Extension via content script...');
    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('User:', user);

    // Send message via window.postMessage
    // The content script will listen for this and forward to extension background
    window.postMessage(
        {
            source: "SENTINEL_X_WEB",
            action: "LOGIN_SYNC",
            token: token,
            user: user,
        },
        "*" // Same origin
    );

    console.log('✅ Auth sync message posted to content script');
};
