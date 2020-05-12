import Utilities from "../Utilities";

export default class MainGame extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name: string = "MainGame";

	public preload(): void {
	}

	public create(): void {
		Utilities.LogSceneMethodEntry("MainGame", "create");

		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "Phaser-Logo-Small");

		this.addSeaFloor();
	}

	/**
	 * Adds a sea floor to the game.
	 */
	addSeaFloor(): void {
		const gameHeight = this.cameras.main.height;
		const gameWidth = this.cameras.main.width;

		// 064-071 = background foliage
		const backgroundFoliageTiles = ['064', '065', '066', '067', '068', '069', '070', '071']
		const foliageStartY = gameHeight - 112;
		for (let i = 0; i < 4; i++) {
			const backgroundFoliageTile = backgroundFoliageTiles[Phaser.Math.Between(0, backgroundFoliageTiles.length - 1)];
			const startNumber = (25 * i) + 1;
			const endNumber = (i + 1) * 25;
			const foliageStartX = gameWidth * (Phaser.Math.Between(startNumber, endNumber) / 100);
			const randomScale = 1 + (Phaser.Math.Between(2, 6) / 10);
			this.add.sprite(foliageStartX, foliageStartY, 'fishTile_' + backgroundFoliageTile).setOrigin(0, 1).setScale(randomScale);
		}

		// 010-017, 028-035, 046-053 = foliage


		// Set the tiles that go well together for the upper layer of the sea floor.
		const topTilesDark = ['056', '057', '060', '061', '062', '063'];
		const topTilesLight = ['020', '021', '024', '025', '026', '027'];
		// TODO make this a setting?
		const useDarkTiles = (Phaser.Math.Between(0, 1) === 1);

		const topTiles = useDarkTiles ? topTilesDark : topTilesLight;

		// 64x64, 001 and 126
		// 001-009, 018-027 = light sand
		// 126 = solid light sand?
		// Loop through the width of the screen adding a bottom and top sea layer.
		for (let i = 0; i < Math.ceil(gameWidth / 64); i++) {
			let bottomTile: string;
			if (Phaser.Math.Between(0, 10) > 9) {
				// Add a random sea shell.
				if (useDarkTiles) {
					bottomTile = Phaser.Math.Between(0, 1) === 1 ? '054' : '055';
				} else {
					bottomTile = Phaser.Math.Between(0, 1) === 1 ? '018' : '019';
				}
			} else {
				if (useDarkTiles) {
					bottomTile = Phaser.Math.Between(0, 1) === 1 ? '036' : '037';
				} else {
					bottomTile = Phaser.Math.Between(0, 1) === 1 ? '001' : '126';
				}
			}
			const topTile = topTiles[Phaser.Math.Between(0, topTiles.length - 1)];

			let bottomSeaFloor = this.add.sprite(64 * i, gameHeight, 'fishTile_' + bottomTile).setOrigin(0, 1);
			// TODO add foliage
			let topSeaFloor = this.add.sprite(64 * i, gameHeight - 64, 'fishTile_' + topTile).setOrigin(0, 1);
			//console.log(topTile);
		}
	}
}
