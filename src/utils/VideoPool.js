// Video Pool Manager - Object Pooling Pattern for Memory Efficiency
// Reuses video DOM elements instead of creating/destroying them
class VideoPool {
    constructor(maxSize = 2) {
        this.pool = [];
        this.maxSize = maxSize;
        this.activeVideos = new Map(); // Track active video usage
        this.srcCache = new Map(); // Cache: src -> video element (prevents re-downloading)
    }

    acquire(src, onLoad) {
        let video;

        // Check if we already have this video loaded in cache
        if (this.srcCache.has(src)) {
            video = this.srcCache.get(src);
            // Video already has correct src, no need to reload
            if (onLoad && video.readyState >= 2) {
                // Video already loaded, call onLoad immediately
                onLoad();
            } else if (onLoad) {
                video.addEventListener('loadeddata', onLoad, { once: true });
            }
            this.activeVideos.set(video, src);
            return video;
        }

        // Reuse from pool if available
        if (this.pool.length > 0) {
            video = this.pool.pop();
        } else {
            video = document.createElement('video');
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.setAttribute('webkit-playsinline', 'true');
            video.disablePictureInPicture = true;
        }

        // Only set src if it's different (prevents re-downloading!)
        if (video.src !== src) {
            video.src = src;
            video.preload = 'auto';
        }

        if (onLoad) {
            video.addEventListener('loadeddata', onLoad, { once: true });
        }

        this.activeVideos.set(video, src);
        this.srcCache.set(src, video); // Cache this video for this src
        return video;
    }

    release(video) {
        if (!video) return;

        const src = this.activeVideos.get(video);

        // Pause but DON'T clear src (keep it cached!)
        video.pause();
        video.currentTime = 0;

        this.activeVideos.delete(video);

        // Keep in cache for reuse, but also add to pool if not full
        if (this.pool.length < this.maxSize && !this.pool.includes(video)) {
            this.pool.push(video);
        }
    }

    clear() {
        // Release all active videos
        this.activeVideos.forEach((_, video) => this.release(video));

        // Clear pool and cache
        this.pool.forEach(video => {
            video.src = '';
            video.load();
            video.remove();
        });
        this.pool = [];
        this.srcCache.clear();
    }
}

export default VideoPool;
