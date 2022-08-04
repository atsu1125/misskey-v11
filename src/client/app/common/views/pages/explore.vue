<template>
<div>
	<ui-input v-model="query" style="margin: 1.2em 0.5em 1.5em;">
		<span>{{ $t('searchUser') }}</span>
	</ui-input>
	<mk-user-list v-if="query && query !== ''" :pagination="foundUsers" :key="`${query}`">
		<fa :icon="faSearch" fixed-width/>{{ query }}
	</mk-user-list>

	<div class="localfedi7" v-if="meta && stats && tag == null" :style="{ backgroundImage: meta.bannerUrl ? `url(${meta.bannerUrl})` : null }">
		<header>{{ $t('explore', { host: meta.name || 'Areionskey' }) }}</header>
		<div>{{ $t('users-info', { users: num(stats.originalUsersCount) }) }}</div>
	</div>

	<template v-if="tag == null">
		<mk-user-list :pagination="pinnedUsers" :expanded="false">
			<fa :icon="faBookmark" fixed-width/>{{ $t('pinned-users') }}
		</mk-user-list>
		<mk-user-list :pagination="verifiedUsers" :expanded="false">
			<fa :icon="faCertificate" fixed-width/>{{ $t('verified-users') }}
		</mk-user-list>
		<mk-user-list :pagination="recentlyUpdatedUsers" :expanded="false">
			<fa :icon="faCommentAlt" fixed-width/>{{ $t('recently-updated-users') }}
		</mk-user-list>
		<mk-user-list :pagination="recentlyRegisteredUsers" :expanded="false">
			<fa :icon="faPlus" fixed-width/>{{ $t('recently-registered-users') }}
		</mk-user-list>
	</template>

	<div class="localfedi7" v-if="tag == null" :style="{ backgroundImage: `url(/assets/fedi.jpg)` }">
		<header>{{ $t('explore-fediverse') }}</header>
	</div>

	<template v-if="tag == null">
		<mk-user-list :pagination="recentlyUpdatedUsersF" :expanded="false">
			<fa :icon="faCommentAlt" fixed-width/>{{ $t('recently-updated-users') }}
		</mk-user-list>
		<mk-user-list :pagination="recentlyRegisteredUsersF" :expanded="false">
			<fa :icon="faRocket" fixed-width/>{{ $t('recently-discovered-users') }}
		</mk-user-list>
	</template>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../../i18n';
import { faPlus, faRocket, faSearch, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faCommentAlt } from '@fortawesome/free-regular-svg-icons';

export default Vue.extend({
	i18n: i18n('common/views/pages/explore.vue'),

	props: {
		tag: {
			type: String,
			required: false
		}
	},

	inject: {
		inNakedDeckColumn: {
			default: false
		}
	},

	data() {
		return {
			pinnedUsers: { endpoint: 'pinned-users' },
			verifiedUsers: { endpoint: 'users', limit: 10, params: {
				state: 'verified',
				origin: 'local',
				sort: '+follower',
			} },
			recentlyUpdatedUsers: { endpoint: 'users', limit: 10, params: {
				origin: 'local',
				sort: '+updatedAt',
			} },
			recentlyRegisteredUsers: { endpoint: 'users', limit: 10, params: {
				origin: 'local',
				state: 'alive',
				sort: '+createdAt',
			} },
			recentlyUpdatedUsersF: { endpoint: 'users', limit: 10, params: {
				origin: 'combined',
				sort: '+updatedAt',
			} },
			recentlyRegisteredUsersF: { endpoint: 'users', limit: 10, params: {
				origin: 'combined',
				sort: '+createdAt',
			} },
			stats: null,
			query: null,
			meta: null,
			num: Vue.filter('number'),
			faBookmark, faCommentAlt, faPlus, faRocket, faSearch, faCertificate
		};
	},

	computed: {
		foundUsers(): any {
			return {
				endpoint: 'users/search',
				limit: 30,
				params: {
					query: this.query,
				}
			};
		},
	},

	watch: {
		tag() {
			if (this.$refs.tags) this.$refs.tags.toggleContent(this.tag == null);
		}
	},

	created() {
		this.$root.api('stats').then(stats => {
			this.stats = stats;
		});
		this.$root.getMeta().then(meta => {
			this.meta = meta;
		});
	},

	mounted() {
		document.title = this.$root.instanceName;
	},
});
</script>

<style lang="stylus" scoped>
.localfedi7
	overflow hidden
	background var(--face)
	color #fff
	text-shadow 0 0 8px #000
	border-radius 6px
	padding 16px
	margin-top 16px
	margin-bottom 16px
	height 80px
	background-position 50%
	background-size cover
	> header
		font-size 20px
		font-weight bold
	> div
		font-size 14px
		opacity 0.8

.localfedi7:first-child
	margin-top 0

.vxjfqztj
	padding 16px

	> *
		margin-right 16px

		&.local
			font-weight bold
</style>
