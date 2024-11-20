document.getElementById("payButton").addEventListener("click", function () {
    Swal.fire({
        title: "Betaling voltooid!",
        text: "Bedankt voor je betaling. Je ontvangt een bevestiging via e-mail.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#264653",
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "index.html";
        }
    });
});
