import { DefineEvent, ReloadEvents } from "./util";
/**
 * You can import other files here or directly execute code
 * Be sure to use the `export` keyword in other files to properly declare them as a module file
 * Use `DefineEvent` to use event defines at different places at once.
 */

// Example event declaration
DefineEvent(defines.events.on_area_cloned, event => {
	game.print(`You just cloned an area! From ${event.destination_area.left_top} to ${event.destination_area.right_bottom}`, {
		r: 255,
		g: 0,
		b: 0
	});
});

ReloadEvents();
