import type { IApiApplication } from "api-types/src/Resources/Application.ts";
import type { IApiUser } from "api-types/src/Resources/mod.ts";

export type ApiOAuth2Scope =
	| "activities.read"
	| "activities.write"
	| "applications.builds.read"
	| "applications.builds.upload"
	| "applications.commands"
	| "applications.commands.update"
	| "applications.commands.permissions.update"
	| "applications.entitlements"
	| "applications.store.update"
	| "bot"
	| "connections"
	| "dm_channels.read"
	| "email"
	| "gdm.join"
	| "guilds"
	| "guilds.join"
	| "guilds.members.read"
	| "identify"
	| "messages.read"
	| "relationships.read"
	| "role_connections.write"
	| "rpc"
	| "rpc.activities.write"
	| "rpc.notifications.read"
	| "rpc.voice.read"
	| "rpc.voice.write"
	| "voice"
	| "webhook.incoming";

export interface IApiResponse {
	application: Partial<IApiApplication>;
	scopes: string[]; // TODO(wioenena) Look this type
	expires: string;
	user?: IApiUser;
}
