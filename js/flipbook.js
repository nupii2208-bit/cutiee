/* =========================================================
   FLIPBOOK
   flipbook.js
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const pages =
            document.querySelectorAll(
                ".flip-page"
            );

        const nextButton =
            document.getElementById(
                "nextPage"
            );

        const previousButton =
            document.getElementById(
                "prevPage"
            );

        const pageNumber =
            document.getElementById(
                "pageNumber"
            );


        if (
            !pages.length ||
            !nextButton ||
            !previousButton
        ) {

            return;

        }


        let currentPage = 0;


        function updatePage() {

            pages.forEach(
                function (page, index) {

                    page.classList.remove(
                        "active-page"
                    );

                    page.style.display =
                        "none";

                }
            );


            pages[currentPage].style.display =
                "flex";


            pages[currentPage].classList.add(
                "active-page"
            );


            if (pageNumber) {

                pageNumber.textContent =
                    `${currentPage + 1} / ${pages.length}`;

            }


            previousButton.disabled =
                currentPage === 0;


            nextButton.disabled =
                currentPage === pages.length - 1;

        }


        nextButton.addEventListener(
            "click",
            function () {

                if (
                    currentPage <
                    pages.length - 1
                ) {

                    currentPage++;

                    updatePage();

                }

            }
        );


        previousButton.addEventListener(
            "click",
            function () {

                if (
                    currentPage > 0
                ) {

                    currentPage--;

                    updatePage();

                }

            }
        );


        updatePage();

    }
);