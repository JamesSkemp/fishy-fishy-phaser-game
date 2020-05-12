import SplashScreen from "./SplashScreen";
import Utilities from "../Utilities";

export default class Preloader extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name: string = "Preloader";

	public preload(): void {
		this.addProgressBar();

		this.load.path = "assets/";
		this.load.image("phaser_pixel_medium_flat");
		this.load.image("Phaser-Logo-Small");
		this.load.image('transparent');

		// This will eventually use the spritesheet, but for now add each image individually.
		// See https://stackoverflow.com/a/8043061/11912 for number formatting.
		this.load.path = 'assets/kenney_fishpack/PNG/Default size/';
		for (let i = 1; i <= 126; i++) {
			// 64x64
			// 072-081, 100-107 = fish
			// 090-099 = skeletons
			// 108-117 = numbers
			// 123-125 = bubbles
			// 002-009, 020-027 = light sand top
			// 018-019 = light sand shell
			// 001, 126 = solid light sand
			// 036-037 = solid dark sand
			// 038-045, 056-063 = dark sand top
			// 054-055 = dark sand shell
			// 088-089 = water
			// 010-017, 028-035, 046-053 = foliage
			// 064-071 = background foliage
			// 082-085 = rocks
			this.load.image('fishTile_' + ('00' + i).slice(-3));
		}
	}

	public create(): void {
		Utilities.LogSceneMethodEntry("Preloader", "create");

		this.scene.start(SplashScreen.Name);
	}

	public update(): void {
	}

	/**
	 * Adds a progress bar to the display, showing the percentage of assets loaded and their name.
	 */
	private addProgressBar(): void {
		const width = this.cameras.main.width;
		const height = this.cameras.main.height;
		const outerTextColor = '#202A2E';

		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();
		progressBox.fillStyle(0x40555C, 0.8);
		progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

		const loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: "Loading...",
			style: {
				font: "20px monospace",
				fill: outerTextColor
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		const percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: "0%",
			style: {
				font: "18px monospace",
				fill: "#ffffff"
			}
		});
		percentText.setOrigin(0.5, 0.5);

		const assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: "",
			style: {
				font: "18px monospace",
				fill: outerTextColor
			}
		});

		assetText.setOrigin(0.5, 0.5);

		this.load.on("progress", (value: number) => {
			percentText.setText(parseInt(value * 100 + "", 10) + "%");
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect((width / 4) + 10, (height / 2) - 30 + 10, (width / 2 - 10 - 10) * value, 30);
		});

		this.load.on("fileprogress", (file: Phaser.Loader.File) => {
			assetText.setText("Loading asset: " + file.key);
		});

		this.load.on("complete", () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});
	}
}
