<template>
<div>
	<ui-card>
		<template #title><fa :icon="faStream"/> {{ $t('logs') }}</template>
		<section class="fit-top">
			<ui-horizon-group inputs>
				<ui-input v-model="domain" :debounce="true">
					<span>{{ $t('domain') }}</span>
				</ui-input>
				<ui-select v-model="level">
					<template #label>{{ $t('level') }}</template>
					<option value="all">{{ $t('levels.all') }}</option>
					<option value="info">{{ $t('levels.info') }}</option>
					<option value="success">{{ $t('levels.success') }}</option>
					<option value="warning">{{ $t('levels.warning') }}</option>
					<option value="error">{{ $t('levels.error') }}</option>
					<option value="debug">{{ $t('levels.debug') }}</option>
				</ui-select>
			</ui-horizon-group>

			<div class="nqjzuvev">
				<code v-for="log in logs" :key="log.id" :class="log.level">
					<details>
						<summary><mk-time :time="log.createdAt"/> [{{ log.domain.join('.') }}] {{ log.message }}</summary>
						<highlightjs v-if="log.data" language="json" :code="JSON.stringify(log.data, null, 2)"/>
					</details>
				</code>
			</div>

			<ui-button @click="deleteAll()" :disabled="!$store.getters.isAdminOrModerator">{{ $t('delete-all') }}</ui-button>
		</section>
	</ui-card>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../i18n';
import { faStream } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
	i18n: i18n('admin/views/logs.vue'),

	data() {
		return {
			logs: [],
			level: 'all',
			domain: '',
			faStream
		};
	},

	watch: {
		level() {
			this.logs = [];
			this.fetch();
		},

		domain() {
			this.logs = [];
			this.fetch();
		}
	},

	mounted() {
		this.fetch();
	},

	methods: {
		fetch() {
			this.$root.api('admin/logs', {
				level: this.level === 'all' ? null : this.level,
				domain: this.domain === '' ? null : this.domain,
				limit: 100
			}).then(logs => {
				this.logs = logs.reverse();
			});
		},

		deleteAll() {
			this.$root.dialog({
				type: 'warning',
				text: this.$t('delete-all-are-you-sure'),
				showCancelButton: true
			}).then(({ canceled }) => {
				if (canceled) return;
				this.$root.api('admin/delete-logs').then(() => {
					this.$root.dialog({
						type: 'success',
						splash: true
					});
				});
			});
		}
	}
});
</script>

<style lang="stylus" scoped>
.nqjzuvev
	padding 8px
	background #000
	color #fff
	font-size 14px

	> code
		display block

		&.error
			color #f00

		&.warning
			color #ff0

		&.success
			color #0f0

		&.debug
			opacity 0.7

</style>
