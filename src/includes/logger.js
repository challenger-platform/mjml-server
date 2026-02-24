import { createLogger, transports, format } from 'winston'

// Build settings for different labels
function buildSettings(label){
	return {
		level: 'info',
		format: process.env.NODE_ENV === 'production' 
			? format.combine(
				format.label({ label }),
				format.json()
			)
			: format.combine(
				format.label({ label }),
				format.colorize(),
				format.simple()
			),
		transports: [new transports.Console()],
	}
}

// Create actual loggers
const logger = createLogger(buildSettings('default'));

export {
	logger
}
