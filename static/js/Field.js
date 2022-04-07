class Field extends THREE.Mesh {
    constructor(i, j) {
        let geometry = new THREE.BoxGeometry(30, 10, 30);
        let material = new THREE.MeshPhongMaterial({
            color: (game.boardColors[i][j] == 0 ? 0x444444 : 0x888888),
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 1,
            map: new THREE.TextureLoader().load("img/wood.jpg"),
        });
        super(geometry, material)
        this.position.set((i * 30) - (game.boardSize / 2 * 30) + 15, 0, (j * 30) - (game.boardSize / 2 * 30) + 15)
        this.type = "field"
        this.i = i
        this.j = j
        this.white = (game.boardColors[i][j] == 1)
    }
}