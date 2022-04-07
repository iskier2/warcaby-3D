class Pawn extends THREE.Mesh {
    constructor(i, j) {
        let geometry = new THREE.CylinderGeometry(12, 12, 10, 32)
        let material = new THREE.MeshPhongMaterial({
            color: (game.boardPositions[i][j] == 1 ? 0xffffff : 0x222222),
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 1,
            map: new THREE.TextureLoader().load("img/wood.jpg"),
        });
        super(geometry, material)
        this.position.set((i * 30) - (game.boardSize / 2 * 30) + 15, 10, (j * 30) - (game.boardSize / 2 * 30) + 15)
        this.type = "pawn"
        this.i = i
        this.j = j
        this.white = (game.boardPositions[i][j] == 1)
    }
    onclick() {
        this.material.color.setHex(0xffff00)
    }
    loseFocus() {
        this.material.color.setHex((game.player.number == 0 ? 0xffffff : 0x222222))
    }
    move(i, j) {
        this.position.set((i * 30) - (game.boardSize / 2 * 30) + 15, 10, (j * 30) - (game.boardSize / 2 * 30) + 15)
    }
}