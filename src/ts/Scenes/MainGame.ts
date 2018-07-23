export default class MainGame extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name: string = "MainGame";

	preload(): void {
	}

	create(): void {
		console.log((new Date).toISOString() + ' : Entered MainGame create()');
	}

	update() : void {
	}
}