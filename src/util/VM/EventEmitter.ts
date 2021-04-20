interface EventStore {
	[key: string]: Array<Function>;
}

interface Error {
	name: string;
	message: string;
	severity: 'THROW' | 'MILD';
	data?: any;
}

class EventEmitter {
	private events: EventStore;
	private status: any;
	constructor() {
		this.events = {};
		this.status = {};
	}

	/**
	 * Emits event
	 * @param name Name of Event
	 * @param data Data to pass with event
	 * @returns False if no listeners exist true if they do
	 */
	protected emitEvent(name: string, data?: any) {
		let triggers = this.events[name.toUpperCase()];
		if (!triggers || !Array.isArray(triggers)) return false;
		triggers.forEach((func) => {
			func(data);
		});

		return true;
	}

	/**
	 * Sets value of status variable to given value
	 * @param name Name of status variable
	 * @param value Value to set to
	 */
	protected setStatus(name: string, value: any) {
		this.status[name.toUpperCase()] = value;
	}

	/**
	 * Creates event listener for given event
	 * @param name Name of event to listen to
	 * @param callback Function to to execute of event (passed data)
	 * @returns Returns true if execution successful
	 */
	public on(name: string, callback: (data: any) => void) {
		if (
			!this.events[name.toUpperCase()] ||
			!Array.isArray(this.events[name.toUpperCase()])
		) {
			this.events[name.toUpperCase()] = [callback];
			return true;
		}
		this.events[name.toUpperCase()].push(callback);
	}

	/**
	 * Gets status variable
	 * @param name Name of status variable
	 * @returns Value of status variable
	 */
	public getStatus(name: string) {
		return this.status[name.toUpperCase()];
	}

	/**
	 * Emits error event
	 * @param param0 Data of error to emit
	 */
	protected error({ name, message, severity, data }: Error) {
		this.emitEvent('ERROR', { name, message, severity, data });
	}

	/**
	 * Creates event listener for error
	 * @param name Name of error (pass empty string to execute on all)
	 * @param callback Callback to execute on error event (passed error data)
	 */
	public catch(name: string, callback: (data: Error) => void) {
		this.on('ERROR', (data) => {
			if (data.name.toUpperCase() === name.toUpperCase() || name === '')
				callback(data);
		});
	}
}

export default EventEmitter;
