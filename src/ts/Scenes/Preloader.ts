import MainMenuScene from "./MainMenuScene";

export default class Preloader extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name: string = "Preloader";

	preload(): void {
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(640 / 4, 480 / 2 - 30, 640 / 2, 50);
		
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		var loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);
		
		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);
		
		var assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: '',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});

		assetText.setOrigin(0.5, 0.5);
		
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100 + '') + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect((640 / 4) + 10, (480 / 2) - 30 + 10, (640 / 2 - 10 - 10) * value, 30);
		});
		
		this.load.on('fileprogress', function (file) {
			assetText.setText('Loading asset: ' + file.key);
		});

		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});

		this.load.path = 'assets/';
		this.load.image('transparent');

		// This will eventually use the spritesheet, but for now add each image individually.
		// See https://stackoverflow.com/a/8043061/11912 for number formatting.
		this.load.path = 'assets/kenney_fishpack/PNG/Default size/';
		for (let i = 1; i <= 126; i++) {
			this.load.image('fishTile_' + ('00' + i).slice(-3));
		}
	}

	create(): void {
		console.log((new Date).toISOString() + ' : Entered Preloader create()');

		this.scene.start(MainMenuScene.Name);
	}

	update() : void {
	}
}