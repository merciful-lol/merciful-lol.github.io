document.addEventListener('DOMContentLoaded', function() {
    const files = [
        "../songs/1.mp3",
        "../songs/2.mp3",
        "../songs/3.mp4",
        "../songs/5.mp3",
        "../songs/6.mp3",
        "../songs/7.mp3",
        "../songs/8.mp3",
        "../songs/9.mp3",
        "../songs/10.mp3",
    ];
    let currentsongindex = Math.floor(Math.random() * files.length);

    const audioplayer = document.getElementById("musicplayer");
    const songplayerprogressbarfill = document.querySelector(".song-player-progress-bar-fill");
    const playpausebutton = document.getElementById("play-pause-button");
    const songplayertime = document.querySelector(".song-player-time");
    const nextbutton = document.getElementById("next-button");
    const prevbutton = document.getElementById("prev-button");

    function toggleplaypause() {
        if (audioplayer.paused) {
            audioplayer.play();
            playpausebutton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioplayer.pause();
            playpausebutton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    function loadsong(index) {
        audioplayer.src = files[index];
        audioplayer.loop = true;
    }

    function playnextsong() {
        currentsongindex = (currentsongindex + 1) % files.length;
        loadsong(currentsongindex);
        audioplayer.play();
    }

    function playprevioussong() {
        currentsongindex = (currentsongindex - 1 + files.length) % files.length;
        loadsong(currentsongindex);
        audioplayer.play();
    }

    audioplayer.addEventListener("timeupdate", () => {
        const { currentTime, duration } = audioplayer;
        const progresspercent = (currentTime / duration) * 100;
        songplayerprogressbarfill.style.width = `${progresspercent}%`;

        let currentminutes = Math.floor(currentTime / 60);
        let currentseconds = Math.floor(currentTime % 60);
        if (currentseconds < 10) {
            currentseconds = `0${currentseconds}`;
        }

        let durationminutes = Math.floor(duration / 60);
        let durationseconds = Math.floor(duration % 60);
        if (durationseconds < 10) {
            durationseconds = `0${durationseconds}`;
        }

        songplayertime.textContent = `${currentminutes}:${currentseconds} / ${durationminutes}:${durationseconds}`;
    });

    playpausebutton.addEventListener("click", toggleplaypause);
    nextbutton.addEventListener("click", playnextsong);
    prevbutton.addEventListener("click", playprevioussong);

    loadsong(currentsongindex);

    const typedtextspan = document.querySelector(".typed");
    const cursorspan = document.querySelector(".cursor");

    const textarray = ["Full-Stacks Developer", "13 y.o"];
    const typingdelay = 100;
    const erasingdelay = 50;
    const newtextdelay = 1000;
    let textarrayindex = 0;
    let charindex = 0;

    function type() {
        if (charindex < textarray[textarrayindex].length) {
            if (!cursorspan.classList.contains("typing")) cursorspan.classList.add("typing");
            typedtextspan.textContent += textarray[textarrayindex].charAt(charindex);
            charindex++;
            setTimeout(type, typingdelay);
        } else {
            cursorspan.classList.remove("typing");
            setTimeout(erase, newtextdelay);
        }
    }

    function erase() {
        if (charindex > 0) {
            if (!cursorspan.classList.contains("typing")) cursorspan.classList.add("typing");
            typedtextspan.textContent = textarray[textarrayindex].substring(0, charindex - 1);
            charindex--;
            setTimeout(erase, erasingdelay);
        } else {
            cursorspan.classList.remove("typing");
            textarrayindex++;
            if (textarrayindex >= textarray.length) textarrayindex = 0;
            setTimeout(type, typingdelay + 1100);
        }
    }

    if (textarray.length) setTimeout(type, newtextdelay + 250);

    document.getElementById('blur-container').addEventListener('click', function() {
        document.getElementById('blur-container').style.display = 'none';
        audioplayer.play();

    });
});
