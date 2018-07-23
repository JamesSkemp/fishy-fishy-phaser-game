import Preloader from "./Preloader";

export default class Boot extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name: string = "Boot";

	preload(): void {
	}
	
	create() : void {
		this.scene.start(Preloader.Name);
	}
}