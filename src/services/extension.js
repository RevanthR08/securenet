/**
 * Sentinel-X Chrome Extension Integration (External Messaging)
 * 
 * Uses chrome.runtime.sendMessage to communicate directly with extension.
 * Requires extension ID and externally_connectable configuration.
 */

// Extension ID - get from chrome://extensions/
const EXTENSION_ID = "ggmagkfoefolcgfclpcdddibgfoibflb";

/**
 * Syncs authentication to Sentinel-X Chrome Extension
 * @param {string} token - JWT authentication token
 * @param {object} user - User profile object with id, username, etc.
 */
export const connectToExtension = (token, user) => {
    console.log('🔌 Syncing auth to Sentinel-X Extension...');
    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('User:', user);
    console.log('Extension ID:', EXTENSION_ID);

    // Check if Chrome extension API is available
    if (!window.chrome || !window.chrome.runtime) {
        console.warn("Sentinel-X: Extension not found or browser not supported.");
        return;
    }

    console.log('✅ Chrome runtime API is available');

    // Send message to extension
    window.chrome.runtime.sendMessage(
        EXTENSION_ID,
        {
            action: "LOGIN_SYNC",
            token: token,
            user: user,
        },
        (response) => {
            if (window.chrome.runtime.lastError) {
                console.error("❌ Sentinel-X Extension Error:", window.chrome.runtime.lastError);
            } else if (response && response.success) {
                console.log("✅ Sentinel-X Extension Connected!");
                console.log("Response:", response);
            } else {
                console.warn("⚠️ Extension responded but without success flag:", response);
            }
        }
    );
};
