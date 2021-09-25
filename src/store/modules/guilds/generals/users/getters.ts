import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildUserState } from '@/store/modules/guilds/generals/users/state'
import { GuildUserAtUserList } from '@/types/model/auth/user/user'

export type GuildUserGetters<S = GuildUserState> = {
  userList(state: S): Array<GuildUserAtUserList>
}

export const guildUserGetters: GetterTree<GuildUserState, RootState> & GuildUserGetters = {
  userList: (state) => state.userList,
}
