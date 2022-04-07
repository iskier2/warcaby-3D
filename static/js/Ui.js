// klasa Ui - obsługa interfejsu 2D aplikacji (pola txt, przycisk logowania)
class Ui {
    login() {
        document.getElementById("loginButton").onclick = () => {
            let name = document.getElementById("loginName").value
            net.login(name)
        }
    }
    handleLogin(data) {
        document.getElementById("loginContainer").remove()
        console.log(data)
        let header = document.getElementById("header")
        if (data.getPlace) {
            if (data.number == 0) {
                net.checkHowManyPlayers()
                ui.addLoader()
                game.camera.position.set(-250, 250, 0)
                game.camera.lookAt(-20, 0, 0);
            }
            else game.start()
            game.player.number = data.number
            game.player.nick = data.nick
            game.player.isPlaying = true
            header.innerHTML = `
                <p>User added</p>
                <p>Hello ${data.nick} you are playing ${data.number == 0 ? "white" : "black"}</p>
            `
        } else {
            header.innerHTML = `<p>${data.message}</p>`
        }
    }
    addLoader() {
        let img = document.createElement("img")
        img.src = "img/loader.gif"
        img.id = "loader"
        document.body.appendChild(img)
    }
}