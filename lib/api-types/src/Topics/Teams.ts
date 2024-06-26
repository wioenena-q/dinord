import type { Optional, Snowflake } from "api-types/src/mod.ts";
import type { IApiUser } from "api-types/src/Resources/mod.ts";

export const enum ApiTeamMemberRoleType {
	Owner = "", // TODO(wioenena) Look into this
	Admin = "admin",
	Developer = "developer",
	ReadOnly = "read_only",
}

export interface IApiTeam {
	icon: Optional<string>;
	id: Snowflake;
	members: IApiTeamMember[];
	name: string;
	owner_user_id: Snowflake;
}

export interface IApiTeamMember {
	membership_state: ApiMembershipState;
	team_id: Snowflake;
	user: Partial<IApiUser>;
	role: ApiTeamMemberRoleType;
}

export const enum ApiMembershipState {
	INVITED = 1,
	ACCEPTED = 2,
}
