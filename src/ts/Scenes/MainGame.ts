import Utilities from "../Utilities";

export default class MainGame extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name: string = "MainGame";

	public preload(): void {
		this.cameras.main.setBackgroundColor('#A1D6E7');
	}

	public create(): void {
		Utilities.LogSceneMethodEntry("MainGame", "create");

		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "Phaser-Logo-Small");

		this.addSeaFloor();
	}

	addSeaFloor(): void {
		const gameHeight = this.cameras.main.height;
		const gameWidth = this.cameras.main.width;

		//const topTiles = ['002', '003', '004', '005', '006', '007', '008', '009', '020', '021', '022', '023', '024', '025', '026', '027'];
		//const topTiles = ['020', '021', '022', '023', '024', '025', '026', '027'];
		const topTiles = ['020', '021', '024', '025', '026', '027'];
		const topTilesOption1 = ['022', '023', '027', '024', '025', '026', '025', '021', '021', '025'];
		const topTilesOption2 = ['022', '023', '027', '024', '025', '021', '026', '025', '021', '026'];
		//const topTiles = Phaser.Math.Between(0, 1) === 1 ? topTilesOption1 : topTilesOption2;

		//const topTilesOption1 = [];

		// '022', '023', '027', '024', '025', '026', '025', '021', '021', '025'
		// '022', '023', '027', '024', '025', '021', '026', '025', '021'
		// '021', '021', '025'
		// '020', '024', '025', '021', '026'
		// '026', '025', '021'
		// '025', '024'


		console.log(this.cameras.main.height);
		// 64x64, 001 and 126
		// 001-009, 018-027 = light sand
		// 126 = solid light sand?
		for (let i = 0; i < Math.ceil(gameWidth / 64); i++) {
			let bottomTile = '001';
			if (Phaser.Math.Between(0, 10) > 9) {
				bottomTile = Phaser.Math.Between(0, 1) === 1 ? '018' : '019';
			}
			const topTile = topTiles[Phaser.Math.Between(0, topTiles.length - 1)];
			//const topTile = topTiles[i];

			let bottomSeaFloor = this.add.sprite(64 * i, gameHeight, 'fishTile_' + bottomTile).setOrigin(0, 1);
			let topSeaFloor = this.add.sprite(64 * i, gameHeight - 64, 'fishTile_' + topTile).setOrigin(0, 1);
			console.log(topTile);
		}
	}
}
