document.addEventListener('DOMContentLoaded', function () {
    const files = [
        "../songs/1.mp3",
        "../songs/2.mp3",
        "../songs/3.mp3",
        "../songs/4.mp3",
        "../songs/5.mp3",
        "../songs/6.mp3",
        "../songs/7.mp3",
        "../songs/8.mp3",
        "../songs/9.mp3",
        "../songs/10.mp3"
    ];

    let currentSongIndex = Math.floor(Math.random() * files.length);

    const audioPlayer = document.getElementById("musicplayer");
    const songPlayerProgressBarFill = document.querySelector(".song-player-progress-bar-fill");
    const playPauseButton = document.getElementById("play-pause-button");
    const songPlayerTime = document.querySelector(".song-player-time");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioPlayer.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    function loadSong(index) {
        if (index >= 0 && index < files.length) {
            audioPlayer.src = files[index];
            audioPlayer.load();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            songPlayerTime.textContent = 'Loading...';
        } else {
            playNextSong();
        }
    }

    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % files.length;
        loadSong(currentSongIndex);
        audioPlayer.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function playPreviousSong() {
        currentSongIndex = (currentSongIndex - 1 + files.length) % files.length;
        loadSong(currentSongIndex);
        audioPlayer.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }

    audioPlayer.addEventListener("canplaythrough", () => {
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    });

    audioPlayer.addEventListener("timeupdate", () => {
        const { currentTime, duration } = audioPlayer;

        if (!isNaN(currentTime) && currentTime > 0) {
            const progressPercent = (currentTime / duration) * 100;
            songPlayerProgressBarFill.style.width = `${progressPercent}%`;

            let currentMinutes = Math.floor(currentTime / 60);
            let currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
                currentSeconds = `0${currentSeconds}`;
            }

            let durationMinutes = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) {
                durationSeconds = `0${durationSeconds}`;
            }

            songPlayerTime.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
        }
    });

    audioPlayer.addEventListener("ended", playNextSong);

    songPlayerProgressBarFill.parentElement.addEventListener("click", (e) => {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / progressBar.offsetWidth) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
    });

    playPauseButton.addEventListener("click", togglePlayPause);
    nextButton.addEventListener("click", playNextSong);
    prevButton.addEventListener("click", playPreviousSong);
    loadSong(currentSongIndex);

    const typedTextSpan = document.querySelector(".typed");
    const cursorSpan = document.querySelector(".cursor");
    const textArray = ["Full-Stacks Developer", "13 y.o"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);

    document.getElementById('blur-container').addEventListener('click', function () {
        document.getElementById('blur-container').style.display = 'none';
        audioPlayer.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    });
});
