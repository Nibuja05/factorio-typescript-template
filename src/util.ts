export function GetGlobal(key: string) {
	if (!(key in global)) global[key] = {};
	return global[key];
}

export function SetGlobal(key: string, val: any) {
	global[key] = val;
}

type EventFunc = (this: void, event: event) => void;
const eventList: Map<defines.events | string, EventFunc[]> = new Map();
/**
 * Define an event. Better to use this than directly script.on_event, as this will support multiple callbacks at the same time
 * @param event event to call
 * @param callback callback function
 */
export function DefineEvent<T extends keyof allEvents>(
	event: defines.events | (T extends string ? T : string),
	callback: (this: void, event: allEvents[T]) => void
) {
	if (!eventList.has(event)) eventList.set(event, []);
	eventList.get(event)!.push(callback as EventFunc);
}

/**
 * Reload the previously defined events
 */
export function ReloadEvents() {
	for (const [name, list] of eventList) {
		script.on_event(name, event => {
			for (const callback of list) {
				callback(event);
			}
		});
	}
}
