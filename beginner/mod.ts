import { createBot, fastFileLoader, startBot } from "./deps.ts";
import { configs } from "./configs.ts";
import { logger } from "./src/utils/logger.ts";
import { customCache } from "./src/cache.ts";

const log = logger({ name: "Main" });

log.info("Starting bot, this might take a while...");

// Import (almost) All Of ./src
const paths = [
  "./src/commands",
  // "./src/database",
  "./src/events",
];

await fastFileLoader(paths, (path) => {
  log.info(`Importing: ${path.split("/")[path.split("/").length - 1]}`);
}, () => {
  log.info(`Finishing Imports`);
}).then(() => {
  log.info(`Finished Importing ${paths.length} Directories`);
});

export const bot = createBot({
  token: configs.token,
  botId: configs.botId,
  intents: ["Guilds", "GuildMessages"],
  events: customCache.events,
});

startBot(bot);
