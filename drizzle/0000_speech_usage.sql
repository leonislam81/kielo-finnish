CREATE TABLE `speech_usage` (
	`day` text PRIMARY KEY NOT NULL,
	`characters` integer DEFAULT 0 NOT NULL,
	`requests` integer DEFAULT 0 NOT NULL
);
