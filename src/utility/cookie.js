class StorageHelper {
    setItem(name, value) {
        try {
            localStorage.setItem(name, String(value));
        } catch (e) {
            // localStorage may be unavailable in private mode or if storage is full
            console.warn('localStorage setItem failed:', e);
        }
    }

    getItem(name) {
        try {
            return localStorage.getItem(name);
        } catch (e) {
            console.warn('localStorage getItem failed:', e);
            return null;
        }
    }
}

export default new StorageHelper();