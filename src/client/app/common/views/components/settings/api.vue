<template>
<ui-card>
	<template #title><fa icon="key"/> API</template>

	<section class="fit-top">
		<details>
			<summary>{{ $t('show-token') }}</summary>
			<ui-input :value="$store.state.i.token" readonly>
				<span>{{ $t('token') }}</span>
			</ui-input>
		</details>
		<p>{{ $t('intro') }}</p>
		<ui-info warn>{{ $t('caution') }}</ui-info>
		<p>{{ $t('regeneration-of-token') }}</p>
		<ui-button @click="regenerateToken"><fa icon="sync-alt"/> {{ $t('regenerate-token') }}</ui-button>
	</section>

	<section>
		<header><fa icon="terminal"/> {{ $t('console.title') }}</header>
		<ui-input v-model="endpoint" :datalist="endpoints" @change="onEndpointChange()">
			<span>{{ $t('console.endpoint') }}</span>
		</ui-input>
		<ui-textarea v-model="body">
			<span>{{ $t('console.parameter') }} (JSON or JSON5)</span>
			<template #desc>{{ $t('console.credential-info') }}</template>
		</ui-textarea>
		<ui-button @click="send" :disabled="sending">
			<template v-if="sending">{{ $t('console.sending') }}</template>
			<template v-else><fa icon="paper-plane"/> {{ $t('console.send') }}</template>
		</ui-button>
		<ui-textarea v-if="res" v-model="res" readonly tall>
			<span>{{ $t('console.response') }}</span>
		</ui-textarea>
	</section>
</ui-card>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../../../i18n';
import * as JSON5 from 'json5';

export default Vue.extend({
	i18n: i18n('common/views/components/api-settings.vue'),

	data() {
		return {
			endpoint: 'ping',
			body: '{}',
			res: null,
			sending: false,
			endpoints: []
		};
	},

	created() {
		this.$root.api('endpoints').then(endpoints => {
			this.endpoints = endpoints;
		});
	},

	methods: {
		regenerateToken() {
			this.$root.dialog({
				title: this.$t('enter-password'),
				input: {
					type: 'password'
				}
			}).then(({ canceled, result: password }) => {
				if (canceled) return;
				this.$root.api('i/regenerate_token', {
					password: password
				});
			});
		},

		send() {
			this.sending = true;
			this.$root.api(this.endpoint, JSON5.parse(this.body)).then(res => {
				this.sending = false;
				this.res = JSON5.stringify(res, null, 2);
			}, err => {
				this.sending = false;
				this.res = JSON5.stringify(err, null, 2);
			});
		},

		onEndpointChange() {
			this.$root.api('endpoint', { endpoint: this.endpoint }).then(endpoint => {
				const body = {};
				for (const p of endpoint.params) {
					body[p.name] =
						p.type === 'String' ? '' :
						p.type === 'Number' ? 0 :
						p.type === 'Boolean' ? false :
						p.type === 'Array' ? [] :
						p.type === 'Object' ? {} :
						null;
				}
				this.body = JSON5.stringify(body, null, 2);
			});
		}
	}
});
</script>
