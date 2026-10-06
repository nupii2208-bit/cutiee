document.addEventListener("DOMContentLoaded", function () {

    const music = new Audio("audio/birthday.mp3");
    const musicButton = document.getElementById("musicButton");

    const START_TIME = 110; // 1:56

    music.loop = true;
    music.preload = "auto";

    // Get saved music position
    let savedTime = localStorage.getItem("birthdayMusicTime");

    if (savedTime !== null) {
        savedTime = parseFloat(savedTime);
    } else {
        savedTime = START_TIME;
    }

    // Set saved position
    music.addEventListener("loadedmetadata", function () {

        if (savedTime < music.duration) {
            music.currentTime = savedTime;
        } else {
            music.currentTime = START_TIME;
        }

        // Try to continue automatically
        music.play()
            .then(function () {
                updateButton();
            })
            .catch(function () {
                updateButton();
                console.log("Waiting for user interaction...");
            });
    });

    // Update music button
    function updateButton() {

        if (!musicButton) return;

        if (music.paused) {
            musicButton.textContent = "🎵";
            musicButton.classList.remove("music-playing");
            musicButton.setAttribute("aria-label", "Play music");
        } else {
            musicButton.textContent = "🔊";
            musicButton.classList.add("music-playing");
            musicButton.setAttribute("aria-label", "Pause music");
        }
    }

    // Music button
    if (musicButton) {

        musicButton.addEventListener("click", function (e) {

            e.preventDefault();
            e.stopPropagation();

            if (music.paused) {

                music.play()
                    .then(function () {
                        updateButton();
                    })
                    .catch(function (error) {
                        console.log("Music error:", error);
                    });

            } else {

                music.pause();
                updateButton();
            }
        });
    }

    // Save position continuously
    setInterval(function () {

        if (!music.paused) {
            localStorage.setItem(
                "birthdayMusicTime",
                music.currentTime
            );
        }

    }, 500);

    // Save position before leaving page
    window.addEventListener("beforeunload", function () {

        localStorage.setItem(
            "birthdayMusicTime",
            music.currentTime
        );
    });

    music.addEventListener("play", updateButton);
    music.addEventListener("pause", updateButton);

    updateButton();


    // ⭐ ONE CLICK ANYWHERE TO START MUSIC
    document.addEventListener("click", function startMusicOnce() {

        if (music.paused) {

            music.play()
                .then(function () {

                    updateButton();

                    // Remove this listener after music starts
                    document.removeEventListener(
                        "click",
                        startMusicOnce
                    );

                })
                .catch(function () {
                    console.log("Browser still blocked music.");
                });
        }

    }, { once: true });

});
