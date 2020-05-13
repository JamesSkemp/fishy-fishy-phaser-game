import Utilities from "../Utilities";

export default class MainGame extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name: string = "MainGame";
	fishGroup: Phaser.GameObjects.Group;

	public preload(): void {
	}

	public create(): void {
		Utilities.LogSceneMethodEntry("MainGame", "create");

		this.addSeaFloor();

		this.fishGroup = this.add.group({
			defaultKey: 'fishTile_072',
			maxSize: 25,
			createCallback: (fish) => {
				console.log('create');
				//console.log(fish);
			},
			removeCallback: (fish) => {
				console.log('removed');
				//console.log(fish);
			}
		});
		console.log(this.fishGroup);

		// TODO random
		this.time.addEvent({
			delay: 2000,
			loop: true,
			callback: this.addFish,
			callbackScope: this
		});
	}

	public update(): void {
		const heightToBottom = this.cameras.main.height - 152;
		const killX = this.cameras.main.width + 50;
		// TODO support fish moving from right to left as well
		Phaser.Actions.IncX(this.fishGroup.getChildren(), 1);

		this.fishGroup.children.iterate((fish: Phaser.GameObjects.Sprite) => {
			const randomNumber = Phaser.Math.Between(0, 10);
			if (randomNumber > 6) {
				// TODO this jitters too much. Make a custom sprite and store whether it moved, and in what direction?
				if (randomNumber > 8) {
					if (fish.y < heightToBottom) {
						fish.y++;
					}
				} else {
					if (fish.y > 16) {
						fish.y--;
					}
				}
			}

			if (fish.x > killX || fish.x < -50) {
				this.fishGroup.killAndHide(fish);
			}
		});
	}

	addFish(): void {
		const fishTiles = ['073', '075', '077', '079', '081', '101', '103'];

		let fish: Phaser.GameObjects.Sprite = this.fishGroup.get(-25, Phaser.Math.Between(16, this.cameras.main.height - 160));
		if (!fish) {
			// There are no free fish in the group.
			return;
		}
		// 072-081, 100-107 = fish
		fish.setTexture('fishTile_' + fishTiles[Phaser.Math.Between(0, fishTiles.length - 1)]);
		fish.setActive(true).setVisible(true);
	}

	/**
	 * Adds a sea floor to the game.
	 */
	addSeaFloor(): void {
		const gameHeight = this.cameras.main.height;
		const gameWidth = this.cameras.main.width;

		const foliageStartY = gameHeight - 112;

		// 064-071 = background foliage
		const backgroundFoliageTiles = ['064', '065', '066', '067', '068', '069', '070', '071']
		for (let i = 0; i < 4; i++) {
			const backgroundFoliageTile = backgroundFoliageTiles[Phaser.Math.Between(0, backgroundFoliageTiles.length - 1)];
			const startNumber = (25 * i) + 1;
			const endNumber = (i + 1) * 25;
			const foliageStartX = gameWidth * (Phaser.Math.Between(startNumber, endNumber) / 100);
			const randomScale = 1 + (Phaser.Math.Between(2, 6) / 10);
			this.add.sprite(foliageStartX, foliageStartY, 'fishTile_' + backgroundFoliageTile).setOrigin(0, 1).setScale(randomScale);
		}

		// 010-017, 028-035, 046-053 = foliage
		const foliageTiles = ['010', '011', '012', '013', '014', '015', '016', '017', '028', '029', '030', '031', '032', '033', '034', '035', '046', '047', '048', '049', '050', '051', '052', '053'];
		const numberOfFoliage = Phaser.Math.Between(8, 15);
		for (let i = 0; i < numberOfFoliage; i++) {
			const foliageTile = foliageTiles[Phaser.Math.Between(0, foliageTiles.length - 1)];
			this.add.sprite(Phaser.Math.Between(0, gameWidth), foliageStartY, 'fishTile_' + foliageTile).setOrigin(0, 1).setScale(1);
		}

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
			let topSeaFloor = this.add.sprite(64 * i, gameHeight - 64, 'fishTile_' + topTile).setOrigin(0, 1);
		}
	}
}
