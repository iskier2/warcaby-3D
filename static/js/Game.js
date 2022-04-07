// klasa Game - działania w 3D, generowanie planszy, pionków

class Game {

    constructor() {
        window.onresize = () => this.resize()
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(250, 250, 0)
        this.camera.lookAt(20, 0, 0);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.render()
        this.resize()
        this.player = {
            number: -1,
            nick: "",
            isPlaying: false
        }
        this.isPawnClicked = false
        this.light = new THREE.DirectionalLight(0xffffff, 0.8);
        this.light.position.set(0, 100, 50);
        this.scene.add(this.light);
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(this.ambientLight);
    }
    board() {
        this.boardSize = 8
        this.createBoardPositions()
        this.createBoardColors()
        this.createWebGlBoard()
    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        //console.log("render leci")
    }
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    createBoardColors() {
        this.boardColors = []
        for (let i = 0; i < this.boardSize; i++) {
            this.boardColors[i] = []
            for (let j = 0; j < this.boardSize; j++) {
                if ((i + j) % 2 == 0) this.boardColors[i][j] = 0
                else this.boardColors[i][j] = 1
            }
        }
        console.log(this.boardColors)
    }
    createBoardPositions() {
        this.boardPositions = []
        for (let i = 0; i < this.boardSize; i++) {
            this.boardPositions[i] = []
            for (let j = 0; j < this.boardSize; j++) {
                if ((i + j) % 2 == 1 && i < 2) this.boardPositions[i][j] = 1
                else if ((i + j) % 2 == 1 && i > this.boardSize - 3) this.boardPositions[i][j] = 2
                else this.boardPositions[i][j] = 0
            }
        }
        console.log(this.boardPositions)
    }
    createWebGlBoard() {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                game.scene.add(new Field(i, j))
                if (this.boardPositions[i][j] != 0) {
                    game.scene.add(new Pawn(i, j))
                }
            }
        }
    }
    start() {
        console.log("two players are playing", this.scene.children)
        if (document.getElementById("loader") != null)
            document.getElementById("loader").remove()
        document.onmousedown = (event) => {
            let raycaster = new THREE.Raycaster()
            let mouseVector = new THREE.Vector2()
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1
            raycaster.setFromCamera(mouseVector, this.camera);
            let intersects = raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0) {
                let clickedObject = intersects[0].object
                switch (clickedObject.type) {
                    case "pawn":
                        if ((clickedObject.white && this.player.number == 0) || (!clickedObject.white && this.player.number == 1)) {
                            if (game.isPawnClicked)
                                game.clickedPawn.loseFocus()
                            console.log(clickedObject);
                            clickedObject.onclick()
                            game.clickedPawn = clickedObject
                            game.isPawnClicked = true
                        }
                        break
                    case "field":
                        if (game.isPawnClicked) {
                            if (game.boardPositions[clickedObject.i][clickedObject.j] == 0 && clickedObject.white) {
                                game.boardPositions[game.clickedPawn.i][game.clickedPawn.j] = 0
                                game.boardPositions[clickedObject.i][clickedObject.j] = game.player.number + 1
                                game.clickedPawn.i = clickedObject.i
                                game.clickedPawn.j = clickedObject.j
                                game.clickedPawn.move(clickedObject.i, clickedObject.j)
                                game.clickedPawn.loseFocus()
                                game.isPawnClicked = false
                            }
                        }
                        break
                }
            }
        }
    }
}

