// klasa Net - komunikacja z serwerem - fetch
class Net {
    login(obj) {
        fetch('/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ obj })
        })
            .then(function (response) { return response.json() })
            .then(function (data) { ui.handleLogin(data) })
            .catch(function (error) { console.log(error) });
    }
    checkHowManyPlayers() {
        let check = setInterval(() => {
            fetch('/players', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: ""
            })
                .then(function (response) { return response.json() })
                .then(function (data) {
                    if (data) {
                        clearInterval(check)
                        game.start()
                    }
                })
                .catch(function (error) { console.log(error) });
        }, 500)
    }
}
